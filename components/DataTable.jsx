import React from 'react';
import { useTable, usePagination } from 'react-table';

export const DataTable = ({ columns, data }) => {
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
        state: { pageIndex },
    } = useTable(
        { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
        usePagination
    )

    return (
        <div className="mx-8 my-4">
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

            {/* Pagination */}
            <div className="flex justify-between mt-10">
                <div>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-4 py-2 bg-gray-200 rounded-md">{'<<'}</button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-4 py-2 bg-gray-200 rounded-md">{'<'}</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="px-4 py-2 bg-gray-200 rounded-md">{'>'}</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-4 py-2 bg-gray-200 rounded-md">{'>>'}</button>
                </div>
            </div>
        </div>
    )
}