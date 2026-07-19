import type { Verification, CreateVerificationPayload } from "@/types/verification";

// Simple UUID v4 generator (avoids adding a dependency just for this)
function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Module-level array acts as our fake persistent store for the session
let verifications: Verification[] = [
  // Seed a couple of records so the dashboard isn't empty on first load
  {
    id: generateId(),
    first_name: "Sarah",
    last_name: "Connor",
    email: "sarah.connor@example.com",
    document_type: "PASSPORT",
    status: "APPROVED",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
  {
    id: generateId(),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    document_type: "NATIONAL_ID",
    status: "PENDING",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

export const db = {
  create(payload: CreateVerificationPayload): Verification {
    const now = new Date().toISOString();
    const record: Verification = {
      id: generateId(),
      ...payload,
      status: "PENDING",
      created_at: now,
      updated_at: now,
    };
    verifications = [record, ...verifications];
    return record;
  },

  list(): Verification[] {
    return verifications;
  },

  findById(id: string): Verification | undefined {
    return verifications.find((v) => v.id === id);
  },

  reset(): void {
    verifications = [];
  },
};