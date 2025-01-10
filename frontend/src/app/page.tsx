"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        router.push("/inventories");
      }
    }
  }, [router]);

  return (
    <> </>
  );
}
