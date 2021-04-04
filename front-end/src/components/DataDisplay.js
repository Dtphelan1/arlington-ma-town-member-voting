import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import Select from 'react-select';
import { useHistory } from 'react-router';
import '../styles/table.scss';

function Table({ data, columnFilters, articles }) {
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
        .filter(ad => (columnFilters.length > 0 ? columnFilters.some(cf => cf.value === ad.value) : ad))
        .map(ad => ({
          Header: ad.label,
          accessor: ad.label
        }))
    ];
  }, [columnFilters, articles]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData },
    useSticky
  );

  return (
    <table {...getTableProps()} className="table table-responsive table-striped table-bordered sticky">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
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
                    {cell.render('Cell')}
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
  );
}

function DataDisplay({ data, precinct, columnFilters = [] }) {
  const options = useMemo(
    () =>
      _(data)
        .flatMap(d => d.votes)
        .map(v => ({ value: v.article.id, label: v.article.title }))
        .uniqBy('value')
        .value(),
    [data]
  );

  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);

  const pushFiltersToHistory = filters => {
    history.push(`/data?precinct=${precinct}&articles=${filters.map(c => c.value).join(',')}`);
  };

  const getColumnFilterProp = () => {
    return columnFilters.map(aid => options.find(o => o.value === aid));
  };

  const copyShareLink = async () => {
    // TODO: Replace with window.location.href for full-url
    // 'localhost' doesn't work in bitly
    const longUrl = `${
      window.location.hostname === 'localhost' ? `http://127.0.0.1:3000/${window.location.hash}` : window.location.href
    }`;

    const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

    const response = await fetch(`${apiURL}/share`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl
      })
    });

    const { link } = await response.json();
    navigator.clipboard.writeText(link);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  return (
    <div className="container">
      {showAlert && (
        <div className="row">
          <div className="col-sm-12 ">
            <div className="alert alert-primary" role="alert">
              Link copied to clipboard
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-sm-1">
          <button className="btn btn-primary" onClick={copyShareLink}>
            Share
          </button>
        </div>
        <div className="col-sm-6 offset-sm-2">
          <Select
            placeholder="Select Articles to Display"
            isMulti={true}
            options={options}
            closeMenuOnSelect={false}
            value={columnFilters.map(cf => options.find(o => o.value === cf))}
            onChange={pushFiltersToHistory}
            styles={{
              menu: provided => ({
                ...provided,
                zIndex: 4
              })
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Table data={data} columnFilters={getColumnFilterProp()} articles={options} />
        </div>
      </div>
    </div>
  );
}

export default DataDisplay;
