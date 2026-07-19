import { http, HttpResponse, delay } from "msw";
import { db } from "./db";
import type {
  CreateVerificationPayload,
  CreateVerificationResponse,
  Verification,
  VerificationListItem,
} from "@/types/verification";

const API_BASE = "/api/v1";

export const handlers = [
  // POST /api/v1/verifications
  http.post(API_BASE + "/verifications", async ({ request }) => {
    await delay(800); // simulate network latency so loading states are visible

    const body = (await request.json()) as CreateVerificationPayload;

    // Basic server-side style validation, mirrors what client-side zod already checks
    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.document_type
    ) {
      return HttpResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const record = db.create(body);

    const response: CreateVerificationResponse = {
      id: record.id,
      status: record.status,
      created_at: record.created_at,
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  // GET /api/v1/verifications/:id
  http.get(API_BASE + "/verifications/:id", async ({ params }) => {
    await delay(500);

    const { id } = params;
    const record = db.findById(id as string);

    if (!record) {
      return HttpResponse.json(
        { message: "Verification not found." },
        { status: 404 },
      );
    }

    return HttpResponse.json<Verification>(record, { status: 200 });
  }),

  // GET /api/v1/verifications
  http.get(API_BASE + "/verifications", async () => {
    await delay(600);

    const list: VerificationListItem[] = db.list().map((v) => ({
      id: v.id,
      email: v.email,
      document_type: v.document_type,
      status: v.status,
      created_at: v.created_at,
    }));

    return HttpResponse.json(list, { status: 200 });
  }),
];
