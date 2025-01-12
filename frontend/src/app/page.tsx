"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const NoSsrComponent = dynamic(() => import('../components/NoSsrComponent'), {
  ssr: false,
});

export default function Home() {

  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      router.push("/inventories");
    }
  }, []);

  return (
    <>
      <NoSsrComponent>
        <h1></h1>
      </NoSsrComponent>
    </>
  );
}
