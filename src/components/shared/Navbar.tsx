"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "New Verification" },
  { href: "/verifications", label: "View Verifications" },
];

export function Navbar() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="border-b border-border bg-surface-raised">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white">
            IX
          </span>
          <span className="text-sm font-semibold text-ink">
            Identity Verification
          </span>
        </Link>

        <nav className="flex items-center gap-1 -mx-1 overflow-x-auto sm:mx-0">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-500 hover:text-ink hover:bg-surface",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
