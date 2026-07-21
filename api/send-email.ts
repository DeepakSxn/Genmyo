import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS preflight
  response.setHeader("Access-Control-Allow-Origin", "https://www.genmyo.ai");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const { firstName, fullName, email, whatsapp, dob, country, city, context } =
    request.body || {};

  if (!email) {
    return response.status(400).json({ error: "Missing required field: email" });
  }

  const apiKey = process.env.resend_api;
  if (!apiKey) {
    console.error("Missing resend_api environment variable.");
    return response.status(500).json({ error: "Internal Server Configuration Error" });
  }

  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=hi%20mirror";

  // ─── 1. Admin notification ───────────────────────────────────────────────
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: system-ui, sans-serif; color: #1C1A16; padding: 24px;">
      <h2 style="margin: 0 0 8px;">New GenMyō Registration</h2>
      <p style="margin: 0 0 20px; color: #555;">A new user completed the join form.</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; width: 140px; background: #f9f7f3;">Name</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${fullName || firstName || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; background: #f9f7f3;">Email</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${email || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; background: #f9f7f3;">WhatsApp</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${whatsapp || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; background: #f9f7f3;">Date of Birth</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${dob || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; background: #f9f7f3;">Country</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${country || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; background: #f9f7f3;">City</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${city || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7; font-weight: 600; background: #f9f7f3;">What's on their mind</td>
          <td style="padding: 8px 12px; border: 1px solid #e0ddd7;">${context || "—"}</td>
        </tr>
      </table>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">Sent automatically by the GenMyō registration serverless function.</p>
    </body>
    </html>
  `;

  // ─── 2. User welcome email ────────────────────────────────────────────────
  const welcomeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to GenMyō</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FBF9F4; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1C1A16;">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBF9F4; padding: 40px 16px;">
        <tr>
          <td align="center">

            <!-- Card -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(28,26,22,0.08);">

              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 24px; text-align: center; background-color: #FDFCF8;">
                  <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: #1C1A16;">GENMYŌ</p>
                  <div style="margin: 16px auto 0; width: 80px; height: 1px; background: linear-gradient(90deg, transparent, #B0703E, transparent);"></div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 36px 40px 32px;">

                  <p style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 21px; font-weight: 400; line-height: 1.3; color: #1C1A16;">
                    Hi ${firstName || "there"},
                  </p>

                  <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #4A463E;">
                    Your spot is reserved. Thank you for registering for <strong>The Mirror Project by GenMyō</strong>.
                  </p>

                  <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #4A463E;">
                    We are opening access in small, intentional cohorts to ensure every reflection space remains quiet and personal. We will send you an update here the moment your access is ready.
                  </p>

                  <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #4A463E;">
                    No action is needed right now. If you'd like to reach us in the meantime, simply reply to this email.
                  </p>

                  <!-- Primary CTA -->
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="border-radius: 100px; background-color: #B0703E;">
                        <a href="https://genmyo.ai/linktree" target="_blank"
                           style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 100px; letter-spacing: 0.01em;">
                          Explore All Handles & Links →
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <div style="margin: 32px 0; height: 1px; background-color: rgba(28,26,22,0.07);"></div>

                  <!-- Three small trust points -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 0 0 10px;">
                        <p style="margin: 0; font-size: 13px; color: #6B6760; line-height: 1.5;">
                          <span style="color: #B0703E; font-weight: 600;">Free</span> &nbsp;·&nbsp; No app to download &nbsp;·&nbsp; No spam or aggressive marketing
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style="margin: 0; font-size: 13px; color: #6B6760; line-height: 1.5;">
                          Reply <strong>STOP</strong> at any time to unsubscribe instantly.
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px 32px; background-color: #F4F0E7; border-top: 1px solid rgba(28,26,22,0.06); text-align: center;">
                  <p style="margin: 0 0 6px; font-size: 12px; line-height: 1.6; color: #8C8678;">
                    GenMyō is an inner wellness space delivered through WhatsApp.<br/>
                    It is not therapy, not a diagnostic tool, and not a crisis service.
                  </p>
                  <p style="margin: 8px 0 0; font-size: 12px; color: #8C8678;">
                    © 2026 GenMyō Pte. Ltd. &nbsp;·&nbsp;
                    <a href="mailto:hello@genmyo.ai" style="color: #B0703E; text-decoration: none;">hello@genmyo.ai</a>
                    &nbsp;·&nbsp; Singapore
                  </p>
                </td>
              </tr>

            </table>
            <!-- /Card -->

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  // ─── 3. Send both emails via Resend batch ─────────────────────────────────
  try {
    const res = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify([
        {
          from: "GenMyō <noreply@genmyo.ai>",
          to: ["hello@genmyo.ai"],
          subject: `New registration: ${fullName || firstName || email}`,
          html: adminHtml,
        },
        {
          from: "GenMyō <noreply@genmyo.ai>",
          to: [email],
          subject: "Your spot is reserved — GenMyō",
          html: welcomeHtml,
        },
      ]),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      return response.status(res.status).json({ error: data });
    }

    return response.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Failed to send batch emails via Resend:", error);
    return response.status(500).json({ error: error.message || "Failed to send emails" });
  }
}
