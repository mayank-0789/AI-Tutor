"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  // Fallback return (while redirection occurs)
  return null;
}
