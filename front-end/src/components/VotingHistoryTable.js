import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { Info, ArrowLeft, ArrowRight } from 'react-feather';
import { useTable, usePagination, useFlexLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';
import Tooltip from 'react-tooltip';
import ArticleModal from './ArticleModal';
import '../styles/table.scss';

function repUpForReelection(representative) {
  return representative.reelection === '2021';
}

function Table({ data, precinct, articleFilters, tmm = '', reelectionToggle, articles }) {
  const tableData = useMemo(() => {
    const mappedData = [];
    data.forEach(({ representative, votes }) => {
      const voteObj = { member: representative.fullName, precinct: representative.precinct };
      votes.forEach(v => {
        voteObj[v.article.title] = v.vote;
      });
      mappedData.push(voteObj);
    });

    return mappedData;
  }, [data]);

  const filteredTableData = useMemo(() => {
    const filteredData = [...tableData];
    if (tmm.length) {
      return filteredData.filter(row => {
        return row.member.toLowerCase().includes(tmm.toLowerCase());
      });
    }
    return filteredData;
  }, [tableData, tmm]);

  const membersUpForReelection = useMemo(() => {
    const result = new Set();
    data.forEach(({ representative }) => {
      if (reelectionToggle && repUpForReelection(representative)) {
        result.add(representative.fullName);
      }
    });
    return result;
  }, [data, reelectionToggle]);

  const columns = useMemo(() => {
    const cols = [
      {
        Header: 'Member',
        accessor: 'member',
        sticky: 'left'
      }
    ];
    if (precinct === undefined) {
      cols.push({
        Header: 'Precinct',
        accessor: 'precinct'
      });
    }

    return cols.concat(
      ...articles
        .filter(ad => (articleFilters.length > 0 ? articleFilters.some(cf => cf.value === ad.value) : ad))
        .map(ad => ({
          Header: ad.label,
          accessor: ad.label,
          width: 175,
          Cell: ({ value }) => (!_.isEmpty(value) ? String(value) : <i>Vote Not Recorded</i>)
        }))
    );
  }, [articleFilters, precinct, articles]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
  } = useTable(
    { columns, data: filteredTableData, initialState: { pageSize: 12 }, defaultColumn: { width: 100 } },
    useSticky,
    usePagination,
    useFlexLayout
  );

  // const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = col => {
    const article = articles.find(a => a.label === col.id);
    setSelectedArticle(article.value);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <ArticleModal articleId={selectedArticle} handleClose={closeModal} />
      <Tooltip className="column-header-tooltip" />
      <table {...getTableProps()} className="table table-responsive table-striped table-bordered sticky">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className={'d-flex flex-row ' + (column.id === 'member' ? 'header' : '')}
                >
                  {/* Only display an info button for article-columns */}
                  {column.id !== 'member' && column.id !== 'precinct' && (
                    <button className="btn btn-sm btn-link d-flex align-self-center" onClick={() => openModal(column)}>
                      <Info />
                    </button>
                  )}
                  <span className="column-header-wrapper" data-tip={column.Header}>
                    {column.render('Header')}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  /* Member column should be sticky */
                  return cell.column.id === 'member' ? (
                    <th
                      scope="row"
                      {...cell.getCellProps()}
                      // Special class for reelection rows
                      className={`header ${membersUpForReelection.has(cell.value) ? 'reelection-row' : ''}`}
                    >
                      <span>{cell.render('Cell')}</span>
                    </th>
                  ) : (
                    <td className="body" {...cell.getCellProps()}>
                      <span>{cell.render('Cell')}</span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="pagination-controls" className="d-flex justify-content-center align-items-center ml-0 mt-3 mb-3 mr-0">
        <button
          className="btn btn-primary mr-2 d-inline-flex align-items-center"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ArrowLeft size={16} />
          Previous Page
        </button>
        <span>
          Page{' '}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </span>
        <button
          className="btn btn-primary d-inline-flex align-items-center ml-2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next Page
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}

export default React.memo(Table);
