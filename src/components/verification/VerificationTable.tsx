import Link from "next/link";
import { Badge } from "@/components/UI/Badge";
import { Skeleton } from "@/components/UI/Skeleton";
import type { VerificationListItem } from "@/types/verification";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function VerificationTableSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      ))}
    </div>
  );
}

interface VerificationTableProps {
  items: VerificationListItem[];
}

export function VerificationTable({ items }: VerificationTableProps) {
  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/verifications/${item.id}`}
          className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface"
        >
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-sm font-medium text-ink truncate">
              {item.email}
            </span>
            <span className="text-xs font-mono text-slate-500">
              {item.id} &middot; {formatDate(item.created_at)}
            </span>
          </div>
          <Badge status={item.status} />
        </Link>
      ))}
    </div>
  );
}
