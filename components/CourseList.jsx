'use client'

import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

// Mock data
const courses = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    name: `Course ${i}`,
    professor: `Papa Marius`,
    creditLevel: `4`,
}))

export const DataTable = () => {
    const data = useMemo(() => courses, [])

    const columns = useMemo(() => [
        {
            Header: 'Course',
            accessor: 'name',
        },
        {
            Header: 'Professor',
            accessor: 'professor',
        },
        {
            Header: 'Credit Level',
            accessor: 'creditLevel',
        },
    ], [])

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
        { columns, data, initialState: { pageIndex: 0 } },
        usePagination
    )

    return (
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-10 border-4 border-gray-200">
            {/* Header */}
            <div className="p-6">
                <h1 className="text-xl font-bold">CICS Courses Information</h1>
            </div>

            <table {...getTableProps()} className="table-fixed w-full">
                <thead>
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th {...column.getHeaderProps()} key={columnIndex} className="border px-6 py-4">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={i} className="text-center border cursor-pointer">
                                {row.cells.map((cell, j) => (
                                    <td {...cell.getCellProps()} key={j} className="border px-6 py-4">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-2">
                <div>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button className="bg-gray-200 p-1 rounded" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button className="bg-gray-200 p-1 rounded" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                    <button className="bg-gray-200 p-1 rounded" onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                    <button className="bg-gray-200 p-1 rounded" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </div>
            </div>
        </div>
    )
}