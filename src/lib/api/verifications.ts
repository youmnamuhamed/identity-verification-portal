import { apiClient } from "./client";
import type {
  CreateVerificationPayload,
  CreateVerificationResponse,
  Verification,
  VerificationListItem,
} from "@/types/verification";

export async function createVerification(
  payload: CreateVerificationPayload,
): Promise<CreateVerificationResponse> {
  const { data } = await apiClient.post<CreateVerificationResponse>(
    "/verifications",
    payload,
  );
  return data;
}

export async function getVerification(id: string): Promise<Verification> {
  const { data } = await apiClient.get<Verification>(`/verifications/${id}`);
  return data;
}

export async function listVerifications(): Promise<VerificationListItem[]> {
  const { data } =
    await apiClient.get<VerificationListItem[]>("/verifications");
  return data;
}

