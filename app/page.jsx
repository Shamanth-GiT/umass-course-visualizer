"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Login from '@app/login/Login';

function Home() {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  if (session.status === "loading") return <p>Loading...</p>;
  if (session.status === "authenticated") router?.push("/discovery");

  return (
    <>
      <Login />
    </>
  )
}

export default Home;