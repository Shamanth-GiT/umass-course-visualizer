"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@components/Navbar';
import { CourseList } from './CourseList';

export default function List() {
    const session = useSession();
    const router = useRouter();
    console.log(session);
    if(session.status === "loading") return <p>Loading...</p>;
    if(session.status === "unauthenticated") router?.push("/");
    return (
        <>
        <Navbar />
        <CourseList />
        </>
    )
}
