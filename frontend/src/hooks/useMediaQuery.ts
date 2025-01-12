"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [isClient, setIsClient] = useState(false);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return false;

  useEffect(() => {
    const mediaQueryList = window?.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
