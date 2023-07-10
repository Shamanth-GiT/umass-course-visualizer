import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { PageButton } from '@components/PageButton'; // update with your actual path

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
                        className="ml-2 px-2 py-1 border rounded-md focus:outline-maroon"
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
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={i} className="cursor-pointer">
                                    {row.cells.map((cell, j) => (
                                        <td {...cell.getCellProps()} key={j} className="px-6 py-4 whitespace-nowrap">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-10 focus:outline-maroon">
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
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <PageButton
                        className="rounded-l-md"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        <span className="sr-only">First</span>
                        <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                        className="rounded-r-md"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        <span className="sr-only">Last</span>
                        <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </PageButton>
                </nav>
            </div>
        </div>
    );
};
