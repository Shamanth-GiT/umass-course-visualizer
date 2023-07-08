'use client'

import React, { useMemo } from 'react'
import { DataTable } from '@components/DataTable'

// Mock data
const courses = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    name: `Course ${i}`,
    professor: `Professor ${i}`,
    creditLevel: `Credit Level ${i}`,
}))

export const CourseList = () => {
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

    return <DataTable columns={columns} data={data} />
}