import { z } from "zod";

export const documentTypeOptions = [
  { label: "Passport", value: "PASSPORT" },
  { label: "National ID", value: "NATIONAL_ID" },
] as const;

export const verificationSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  document_type: z.enum(["PASSPORT", "NATIONAL_ID"], {
    message: "Select a document type",
  }),
});

export type VerificationFormValues = z.infer<typeof verificationSchema>;
