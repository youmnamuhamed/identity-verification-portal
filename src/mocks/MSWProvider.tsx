"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    async function init() {
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./browser");
        await worker.start({ onUnhandledRequest: "bypass" });
      }
      setMswReady(true);
    }
    init();
  }, []);

  if (!mswReady) return null; // or a small loading shell

  return <>{children}</>;
}

