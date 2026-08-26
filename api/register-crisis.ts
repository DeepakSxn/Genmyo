import type { VercelRequest, VercelResponse } from "@vercel/node";

const CRISIS_USERS_URL =
  "https://2zvjy3mw7f.execute-api.ap-south-1.amazonaws.com/prod/crisis-users";
const ADMIN_EMAIL = process.env.CRISIS_ADMIN_EMAIL || "hello@genmyo.ai";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface CrisisRegistrationBody {
  firstName?: string;
  surname?: string;
  fullName?: string;
  email?: string;
  whatsapp?: string;
  dob?: string;
  country?: string;
  city?: string;
  context?: string;
  contextPayload?: string;
  crisisSeverity?: string;
  crisisDetectedAt?: string;
  quizPath?: string;
  source?: string;
  lead_id?: string;
  ga_client_id?: string;
  ga_session_id?: string;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Access-Control-Allow-Origin", "https://www.genmyo.ai");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const body = (request.body || {}) as CrisisRegistrationBody;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";

  if (!email && !whatsapp) {
    return response.status(400).json({
      ok: false,
      error: "Missing required field: email or whatsapp",
    });
  }

  const payload = {
    firstName: body.firstName || "",
    surname: body.surname || "",
    fullName: body.fullName || body.firstName || "",
    email,
    whatsapp,
    dob: body.dob || "",
    country: body.country || "",
    city: body.city || "",
    context: body.context || "",
    contextPayload: body.contextPayload || "",
    crisisSeverity: "high",
    crisisDetectedAt: body.crisisDetectedAt || new Date().toISOString(),
    quizPath: body.quizPath || "",
    source: "join",
    lead_id: body.lead_id || "",
    ga_client_id: body.ga_client_id || "",
    ga_session_id: body.ga_session_id || "",
  };

  try {
    const upstream = await fetch(CRISIS_USERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json().catch(() => ({}));

    if (upstream.ok) {
      await sendCrisisEmails(payload).catch((err) =>
        console.error("Crisis email error:", err)
      );
    }

    return response.status(upstream.status).json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to store crisis registration";
    console.error("Crisis users forward error:", error);
    return response.status(502).json({ ok: false, error: message });
  }
}

async function sendCrisisEmails(payload: {
  firstName: string;
  fullName: string;
  email: string;
  whatsapp: string;
  dob: string;
  country: string;
  city: string;
  context: string;
  crisisDetectedAt: string;
}) {
  const apiKey = process.env.resend_api;
  if (!apiKey) {
    console.error("Missing resend_api — crisis emails skipped.");
    return;
  }

  const firstName = escapeHtml(payload.firstName || "there");
  const displayName = escapeHtml(payload.fullName || payload.firstName || payload.email || "Unknown");
  const emails: Array<{ from: string; to: string[]; subject: string; html: string }> = [];

  emails.push({
    from: "GenMyō <noreply@genmyo.ai>",
    to: [ADMIN_EMAIL],
    subject: `CRISIS HOLD — Mirror blocked: ${payload.fullName || payload.firstName || payload.email}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: system-ui, sans-serif; color: #1C1A16; padding: 24px;">
        <div style="background:#7f1d1d;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:20px;">
          <strong>CRISIS HOLD — DO NOT ENGAGE MIRROR</strong>
        </div>
        <p>Stored in Agent_Crisis_Holds. User was shown helplines only. A support email was sent to them if they provided an address.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 12px;border:1px solid #e0ddd7;font-weight:600;width:160px;background:#f9f7f3;">Name</td><td style="padding:8px 12px;border:1px solid #e0ddd7;">${displayName}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0ddd7;font-weight:600;background:#f9f7f3;">Email</td><td style="padding:8px 12px;border:1px solid #e0ddd7;">${escapeHtml(payload.email || "N/A")}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0ddd7;font-weight:600;background:#f9f7f3;">WhatsApp</td><td style="padding:8px 12px;border:1px solid #e0ddd7;">${escapeHtml(payload.whatsapp || "N/A")}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0ddd7;font-weight:600;background:#f9f7f3;">Country / City</td><td style="padding:8px 12px;border:1px solid #e0ddd7;">${escapeHtml(payload.country || "N/A")} / ${escapeHtml(payload.city || "N/A")}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0ddd7;font-weight:600;background:#f9f7f3;">Detected at</td><td style="padding:8px 12px;border:1px solid #e0ddd7;">${escapeHtml(payload.crisisDetectedAt)}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0ddd7;font-weight:600;background:#f9f7f3;">What's on their mind</td><td style="padding:8px 12px;border:1px solid #e0ddd7;">${escapeHtml(payload.context || "—")}</td></tr>
        </table>
      </body>
      </html>
    `,
  });

  if (payload.email) {
    emails.push({
      from: "GenMyō <noreply@genmyo.ai>",
      to: [payload.email],
      subject: "You are not alone — support is available right now",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <body style="margin:0;padding:0;background-color:#FBF9F4;font-family:'Helvetica Neue',Arial,sans-serif;color:#1C1A16;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FBF9F4;padding:40px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(28,26,22,0.08);">
                  <tr>
                    <td style="padding:40px 40px 24px;text-align:center;background-color:#FDFCF8;">
                      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:#1C1A16;">GENMYŌ</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 40px 32px;">
                      <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:21px;color:#1C1A16;">Hi ${firstName},</p>
                      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4A463E;">
                        Thank you for reaching out. Your details have been received.
                      </p>
                      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4A463E;">
                        You are not alone. If you need someone to talk to, free and confidential support is available right now:
                      </p>
                      <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:#4A463E;">
                        <strong>Find a helpline in your country:</strong><br/>
                        <a href="https://findahelpline.com" style="color:#B0703E;">https://findahelpline.com</a>
                      </p>
                      <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:#4A463E;">
                        <strong>In Singapore:</strong> call <a href="tel:1767" style="color:#B0703E;">1767</a>
                        or message <a href="https://wa.me/6591511767" style="color:#B0703E;">9151 1767 on WhatsApp</a>
                        (Samaritans of Singapore, 24 hours)
                      </p>
                      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4A463E;">
                        If you are in immediate danger, please call your local emergency services.
                      </p>
                      <p style="margin:0;font-size:13px;line-height:1.6;color:#6B6760;">
                        GenMyō is not a crisis service.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 40px 32px;background-color:#F4F0E7;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#8C8678;">
                        © 2026 GenMyō Pte. Ltd. · <a href="mailto:hello@genmyo.ai" style="color:#B0703E;text-decoration:none;">hello@genmyo.ai</a> · Singapore
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
  }

  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(emails),
  });

  if (!res.ok) {
    console.error("Resend crisis email error:", await res.text());
  }
}

