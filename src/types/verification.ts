export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type DocumentType = "PASSPORT" | "NATIONAL_ID";

/**
 * Full verification record — shape returned by GET /verifications/{id}
 */
export interface Verification {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  document_type: DocumentType;
  status: VerificationStatus;
  created_at: string; // ISO8601
  updated_at: string; // ISO8601
}

/**
 * Slimmer shape returned by GET /verifications (list view)
 */
export interface VerificationListItem {
  id: string;
  email: string;
  document_type: DocumentType;
  status: VerificationStatus;
  created_at: string;
}

/**
 * Shape returned by POST /verifications (201 Created)
 */
export interface CreateVerificationResponse {
  id: string;
  status: VerificationStatus;
  created_at: string;
}

/**
 * Request body for POST /verifications
 */
export interface CreateVerificationPayload {
  first_name: string;
  last_name: string;
  email: string;
  document_type: DocumentType;
}