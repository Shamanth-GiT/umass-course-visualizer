import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';

export const DataTable = ({ columns, data }) => {
  const [filter, setFilter] = useState('');

  const filteredData = useMemo(() => {
    if (filter) {
      return data.filter((row) => Object.values(row).some((cell) => String(cell).includes(filter)));
    } else {
      return data;
    }
  }, [data, filter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination,
  );

  return (
    <div className="mx-8 my-4">
        <div className="flex justify-end items-center mb-4">
            <div>
                <span>Search:</span>
                <input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder={`${filteredData.length} records...`}
                    className="ml-2 px-2 py-1 border rounded-md"
                />
            </div>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table {...getTableProps()} className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th {...column.getHeaderProps()} key={columnIndex} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={i} className="cursor-pointer">
                                {row.cells.map((cell, j) => (
                                    <td {...cell.getCellProps()} key={j} className="px-6 py-4 whitespace-nowrap">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

        <div className="flex justify-between mt-10">
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                    className="ml-2"
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-4 py-2 bg-gray-200 rounded-md">{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-4 py-2 bg-gray-200 rounded-md">{'<'}</button>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="px-4 py-2 bg-gray-200 rounded-md">{'>'}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-4 py-2 bg-gray-200 rounded-md">{'>>'}</button>
            </div>
        </div>
    </div>
  );
};