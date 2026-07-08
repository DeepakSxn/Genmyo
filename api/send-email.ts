import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const { firstName, fullName, email, whatsapp, dob, country, city, context } = request.body;

  const apiKey = process.env.resend_api;
  if (!apiKey) {
    console.error("Missing resend_api environment variable.");
    return response.status(500).json({ error: "Internal Server Configuration Error" });
  }

  // 1. Construct Admin Notification HTML
  const adminHtml = `
    <h2>New Registration Request</h2>
    <p>A new user has filled out the registration form on the GenMyō website.</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Full Name:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${fullName || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${email || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">WhatsApp:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${whatsapp || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date of Birth:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${dob || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${country || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">City:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${city || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Context / Notes:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${context || "N/A"}</td>
      </tr>
    </table>
    <br/>
    <p style="font-size: 0.85em; color: #888;">This email was automatically generated and sent via GenMyō Serverless registration hook.</p>
  `;

  // 2. Construct User Welcome Email HTML
  const welcomeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to GenMyō</title>
    </head>
    <body style="background-color: #FBF9F4; font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #1C1A16; margin: 0; padding: 40px 20px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid rgba(28,26,22,0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(28,26,22,0.03);">
        <!-- Header -->
        <tr>
          <td style="padding: 40px 40px 20px; text-align: center;">
            <span style="font-family: Georgia, serif; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #1C1A16;">GENMYŌ</span>
          </td>
        </tr>
        <!-- Divider -->
        <tr>
          <td style="padding: 0 40px;">
            <div style="height: 1px; background: linear-gradient(90deg, transparent, #B0703E, transparent);"></div>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding: 40px 40px 30px;">
            <h1 style="font-family: Georgia, serif; font-size: 22px; font-weight: 400; line-height: 1.3; margin: 0 0 20px; color: #1C1A16;">
              Hi ${firstName || "there"},
            </h1>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px; color: #4A463E;">
              Thank you for taking the first step to join GenMyō. We have received your request and are currently reviewing it.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; color: #4A463E;">
              In the meantime, feel free to explore our philosophy or read notes on inner wellness from our team on the blog.
            </p>
            <!-- CTA Button -->
            <table align="left" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="border-radius: 30px; background-color: #B0703E;">
                  <a href="https://www.genmyo.ai/blog" target="_blank" style="display: inline-block; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 30px; border: 1px solid #B0703E;">
                    Read our Blog
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding: 20px 40px 40px; border-top: 1px solid rgba(28,26,22,0.06); background-color: #F4F0E7; text-align: center;">
            <p style="font-size: 12px; line-height: 1.5; margin: 0; color: #8C8678;">
              © 2026 GenMyō Pte. Ltd. · Non-clinical mindfulness &amp; mentorship<br/>
              <a href="mailto:hello@genmyo.ai" style="color: #B0703E; text-decoration: none;">hello@genmyo.ai</a> · Singapore
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

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
          subject: `New GenMyō Registration: ${fullName}`,
          html: adminHtml,
        },
        {
          from: "GenMyō <noreply@genmyo.ai>",
          to: [email],
          subject: "Welcome to GenMyō",
          html: welcomeHtml,
        },
      ]),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return response.status(res.status).json({ error: data });
    }

    return response.status(200).json({ success: true, batchId: data.id });
  } catch (error: any) {
    console.error("Failed to send batch emails via Resend:", error);
    return response.status(500).json({ error: error.message || "Failed to send batch emails" });
  }
}
