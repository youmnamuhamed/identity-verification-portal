"use client";

import Link from "next/link";
import { useVerifications } from "@/hooks/useVerifications";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  VerificationTable,
  VerificationTableSkeleton,
} from "@/components/verification/VerificationTable";

export default function VerificationsPage() {
  const { data, isLoading, isError, error, refetch } = useVerifications();

  return (
    <main className="flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-ink">Verifications</h1>
            <p className="mt-1 text-sm text-slate-500">
              Track the status of submitted identity verifications.
            </p>
          </div>
        </div>

        <Card>
          {isLoading && <VerificationTableSkeleton />}

          {isError && (
            <div className="p-6">
              <ErrorMessage
                title="Couldn't load verifications"
                message={error?.message ?? "Please try again."}
                onRetry={() => refetch()}
              />
            </div>
          )}

          {!isLoading && !isError && data && data.length === 0 && (
            <EmptyState
              title="No verifications yet"
              description="Submitted verifications will appear here."
            />
          )}

          {!isLoading && !isError && data && data.length > 0 && (
            <VerificationTable items={data} />
          )}
        </Card>
      </div>
    </main>
  );
}
