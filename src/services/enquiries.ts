import { API_BASE_URL } from "@/config/env";

/**
 * Submits a gift enquiry to the backend.
 *
 * Same contract as the original Next.js app: `POST /api/enquiries` with a
 * multipart `FormData` body (name, phone, email, city, product, occasion,
 * photo, message). Any non-2xx response is treated as a failure.
 */
export async function submitGiftEnquiry(formData: FormData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }
}
