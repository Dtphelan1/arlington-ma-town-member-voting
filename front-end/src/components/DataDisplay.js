import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import Select from 'react-select';
import '../styles/table.scss';

function Table({ data, columnFilters }) {
  const tableData = useMemo(() => {
    const mappedData = [];
    Object.keys(data.precinctData).forEach(member => {
      const voteObj = { member };
      data.precinctData[member].forEach(v => {
        const articleInfo = data.articleData.find(a => a.id === v.articleId);
        if (articleInfo) {
          voteObj[articleInfo.title] = v.vote;
        }
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
      ...data.articleData
        .filter(ad => (columnFilters.length > 0 ? columnFilters.some(cf => cf.value === ad.id) : ad))
        .map(ad => ({
          Header: ad.title,
          accessor: ad.title
        }))
    ];
  }, [data, columnFilters]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData },
    useSticky
  );

  return (
    <table {...getTableProps()} className="table table-responsive table-striped sticky">
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

function DataDisplay({ data }) {
  const options = useMemo(() => data.articleData.map((ad, i) => ({ value: ad.id, label: ad.title })), [data]);
  const [columns, setColumns] = useState([]);

  return (
    <div>
      <Select
        isMulti={true}
        options={options}
        closeMenuOnSelect={false}
        value={columns}
        onChange={newVal => {
          setColumns(newVal);
        }}
        menuPlacement="top"
      />
      <Table data={data} columnFilters={columns} />
    </div>
  );
}

export default DataDisplay;
