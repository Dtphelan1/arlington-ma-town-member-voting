import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { Info } from 'react-feather';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import Tooltip from 'react-tooltip';
import ArticleModal from './ArticleModal';
import '../styles/table.scss';

function Table({ data, articleFilters, articles }) {
  const tableData = useMemo(() => {
    const mappedData = [];
    data.forEach(({ representative, votes }) => {
      const voteObj = { member: representative.fullName };
      votes.forEach(v => {
        voteObj[v.article.title] = v.vote;
      });
      mappedData.push(voteObj);
    });

    return mappedData;
  }, [data]);

  const columns = useMemo(() => {
    return [
      {
        Header: 'Member',
        accessor: 'member',
        sticky: 'left'
      },
      ...articles
        .filter(ad => (articleFilters.length > 0 ? articleFilters.some(cf => cf.value === ad.value) : ad))
        .map(ad => ({
          Header: ad.label,
          accessor: ad.label,
          Cell: ({ value }) => (!_.isEmpty(value) ? String(value) : <i>No Data</i>)
        }))
    ];
  }, [articleFilters, articles]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData },
    useSticky
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = col => {
    const article = articles.find(a => a.label === col.id);
    setSelectedArticle(article.value);
    setShowModal(true);
  };

  return (
    <>
      {showModal && <ArticleModal articleId={selectedArticle} />}
      <table {...getTableProps()} className="table table-responsive table-striped table-bordered sticky">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={column.id === 'member' && 'header'}>
                  <div className="d-flex flex-row">
                    {column.id !== 'member' && (
                      <button
                        className="btn btn-sm btn-link d-flex align-self-center"
                        onClick={() => openModal(column)}
                      >
                        <Info />
                      </button>
                    )}
                    <div className="column-header-wrapper" data-tip={column.Header}>
                      {column.render('Header')}
                    </div>
                  </div>
                </th>
              ))}
              <Tooltip className="column-header-tooltip" />
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return cell.column.id === 'member' ? (
                    <th scope="row" {...cell.getCellProps()} className="header">
                      <div>{cell.render('Cell')}</div>
                    </th>
                  ) : (
                    <td className="body" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
