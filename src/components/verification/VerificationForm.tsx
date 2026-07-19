"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/UI/Input";
import { Select } from "@/components/UI/Select";
import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import { ErrorMessage } from "@/components/UI/ErrorMessage";

import { useCreateVerification } from "@/hooks/useCreateVerification";
import {
  verificationSchema,
  documentTypeOptions,
  type VerificationFormValues,
} from "@/lib/validation/verificationSchema";

export function VerificationForm() {
  const router = useRouter();
  const { mutate, isPending, isError, error, reset } = useCreateVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      document_type: undefined,
    },
  });

  function onSubmit(values: VerificationFormValues) {
    mutate(values, {
      onSuccess: () => {
        router.push("/verifications");
      },
    });
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-ink">
          Identity Verification
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Submit your details to begin the verification process.
        </p>
      </div>

      {isError && (
        <div className="mb-6">
          <ErrorMessage
            title="Submission failed"
            message={
              error?.message ?? "Something went wrong. Please try again."
            }
            onRetry={reset}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="First Name"
            placeholder="Jane"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="jane.doe@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Select
          label="Document Type"
          placeholder="Select a document type"
          options={[...documentTypeOptions]}
          error={errors.document_type?.message}
          {...register("document_type")}
        />

        <div className="mt-2 flex justify-end">
          <Button type="submit" isLoading={isPending}>
            {isPending ? "Submitting..." : "Submit Verification"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
