import { Badge } from "@/components/UI/Badge";
import { Card } from "@/components/UI/Card";
import { Skeleton } from "@/components/UI/Skeleton";
import type { Verification } from "@/types/verification";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-ink">{value}</span>
    </div>
  );
}

export function VerificationDetailSkeleton() {
  return (
    <Card className="p-6 sm:p-8">
      <Skeleton className="h-6 w-40" />
      <div className="mt-6 divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </Card>
  );
}

interface VerificationDetailProps {
  verification: Verification;
}

export function VerificationDetail({ verification }: VerificationDetailProps) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">
          {verification.first_name} {verification.last_name}
        </h1>
        <Badge status={verification.status} />
      </div>

      <div className="mt-4 divide-y divide-border border-t border-border">
        <DetailRow label="Verification ID" value={verification.id} />
        <DetailRow label="Email" value={verification.email} />
        <DetailRow
          label="Document Type"
          value={
            verification.document_type === "PASSPORT"
              ? "Passport"
              : "National ID"
          }
        />
        <DetailRow
          label="Submitted"
          value={formatDate(verification.created_at)}
        />
        <DetailRow
          label="Last Updated"
          value={formatDate(verification.updated_at)}
        />
      </div>
    </Card>
  );
}
