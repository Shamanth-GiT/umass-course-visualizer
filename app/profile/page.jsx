"use client";

import Navbar from '@components/Navbar';
import { Profile } from '@app/profile/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  if(session.status === "loading") return <p>Loading...</p>;
  if(session.status === "unauthenticated") router?.push("/");
  return (
    <>
      <Navbar />
      <Profile />
    </>
  )
}