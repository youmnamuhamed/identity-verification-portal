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

// Derives initials from an email, e.g. "sarah.connor@example.com" -> "SC"
function getInitials(email: string): string {
  const localPart = email.split("@")[0];
  const parts = localPart.split(/[._-]/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return localPart.slice(0, 2).toUpperCase();
}

// Deterministic pastel color per email, so the same applicant always
// gets the same avatar color across renders.
const avatarPalette = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];

function getAvatarColor(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarPalette[Math.abs(hash) % avatarPalette.length];
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function VerificationTableSkeleton() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            Applicant
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            Submitted
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </th>
          <th className="px-6 py-3" />
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <tr key={i}>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-4 w-24" />
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-6 w-20" />
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-4 w-4" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface VerificationTableProps {
  items: VerificationListItem[];
}

export function VerificationTable({ items }: VerificationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              Applicant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              Document Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-surface">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cnAvatar(getAvatarColor(item.email))}
                    aria-hidden="true"
                  >
                    {getInitials(item.email)}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-ink truncate">
                      {item.email}
                    </span>
                    <span className="text-xs font-mono text-slate-400 truncate">
                      {item.id}
                    </span>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {formatDate(item.created_at)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {item.document_type === "PASSPORT" ? "Passport" : "National ID"}
              </td>
              <td className="px-6 py-4">
                <Badge status={item.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/verifications/${item.id}`}
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 transition-colors hover:bg-surface hover:text-primary"
                  aria-label={`View verification for ${item.email}`}
                >
                  <EyeIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function cnAvatar(colorClasses: string): string {
  return `flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${colorClasses}`;
}
