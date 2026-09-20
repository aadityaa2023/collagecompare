/**
 * Google Form Integration Configuration & Helper
 *
 * To connect to your real Google Form:
 * 1. Create a Google Form with fields: Name, Phone Number, State, Preferred Course, and Profile Summary.
 * 2. Get the pre-filled link or view the form source to find the form action URL and entry IDs:
 *    Example: https://docs.google.com/forms/d/e/1FAIpQLSc.../formResponse
 * 3. Update the GOOGLE_FORM_URL and FIELD_ENTRIES below, or set NEXT_PUBLIC_GOOGLE_FORM_URL in your .env.local
 */

export const GOOGLE_FORM_CONFIG = {
  // Google Form Action URL (formResponse endpoint)
  formUrl:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSfQ_CompareDegree_Demo_Counselling/formResponse",

  fieldEntries: {
    name: process.env.NEXT_PUBLIC_GF_ENTRY_NAME || "entry.1000001",
    phone: process.env.NEXT_PUBLIC_GF_ENTRY_PHONE || "entry.1000002",
    state: process.env.NEXT_PUBLIC_GF_ENTRY_STATE || "entry.1000003",
    preferredCourse: process.env.NEXT_PUBLIC_GF_ENTRY_COURSE || "entry.1000004",
    answersSummary: process.env.NEXT_PUBLIC_GF_ENTRY_SUMMARY || "entry.1000005",
    email: process.env.NEXT_PUBLIC_GF_ENTRY_EMAIL || "entry.1000006",
    message: process.env.NEXT_PUBLIC_GF_ENTRY_MESSAGE || "entry.1000007",
  },
};

/**
 * Submits counselling enquiry data directly to Google Form and backs up locally
 */
export async function submitCounsellingData(data) {
  const timestamp = new Date().toISOString();
  const submissionRecord = {
    ...data,
    submittedAt: timestamp,
    id: `CD-${Date.now().toString(36).toUpperCase()}`,
  };

  // 1. Always store locally in localStorage for resilience & offline proof
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        localStorage.getItem("cc_counselling_leads") || "[]"
      );
      existing.unshift(submissionRecord);
      localStorage.setItem(
        "cc_counselling_leads",
        JSON.stringify(existing.slice(0, 50))
      );
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  // 2. Submit to internal Next.js API route (which also logs/forwards)
  let apiSuccess = false;
  try {
    const res = await fetch("/api/counselling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionRecord),
    });
    if (res.ok) {
      apiSuccess = true;
    }
  } catch (err) {
    console.warn("API route submission notice:", err);
  }

  // 3. Attempt direct client-side Google Form submission using no-cors
  if (
    GOOGLE_FORM_CONFIG.formUrl &&
    !GOOGLE_FORM_CONFIG.formUrl.includes("Demo_Counselling")
  ) {
    try {
      const formData = new FormData();
      formData.append(GOOGLE_FORM_CONFIG.fieldEntries.name, data.name || "");
      formData.append(GOOGLE_FORM_CONFIG.fieldEntries.phone, data.phone || "");
      formData.append(GOOGLE_FORM_CONFIG.fieldEntries.state, data.state || "");
      formData.append(
        GOOGLE_FORM_CONFIG.fieldEntries.preferredCourse,
        data.preferredCourse || ""
      );
      formData.append(
        GOOGLE_FORM_CONFIG.fieldEntries.answersSummary,
        typeof data.answersSummary === "object" ? JSON.stringify(data.answersSummary || {}) : (data.answersSummary || "")
      );
      formData.append(GOOGLE_FORM_CONFIG.fieldEntries.email, data.email || "");
      formData.append(GOOGLE_FORM_CONFIG.fieldEntries.message, data.message || "");

      await fetch(GOOGLE_FORM_CONFIG.formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (gfErr) {
      console.warn("Direct Google Form submission fallback:", gfErr);
    }
  }

  return {
    success: true,
    recordId: submissionRecord.id,
    message: "Counselling request registered successfully!",
  };
}
