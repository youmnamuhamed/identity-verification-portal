"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useVerification } from "@/hooks/useVerification";
import { Button } from "@/components/UI/Button";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import {
  VerificationDetail,
  VerificationDetailSkeleton,
} from "@/components/verification/VerificationDetail";

export default function VerificationDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch } = useVerification(
    params.id,
  );

  return (
    <main className="flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <Link
            href="/verifications"
            className="text-sm text-accent hover:underline"
          >
            &larr; Back to Verifications
          </Link>
        </div>

        {isLoading && <VerificationDetailSkeleton />}

        {isError && (
          <ErrorMessage
            title="Couldn't load verification"
            message={error?.message ?? "This verification may not exist."}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && data && (
          <VerificationDetail verification={data} />
        )}
      </div>
    </main>
  );
}
