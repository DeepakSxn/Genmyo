import fs from "fs";
import path from "path";

// Read API key from .env file manually
const envPath = path.resolve(process.cwd(), ".env");
let apiKey = "";

try {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const match = envContent.match(/resend_api\s*=\s*(.+)/);
  if (match) {
    apiKey = match[1].trim();
  }
} catch (err) {
  console.error("Could not read .env file:", err.message);
  process.exit(1);
}

if (!apiKey) {
  console.error("Missing resend_api key in .env file.");
  process.exit(1);
}

console.log("Sending test email using Resend API key...");

async function sendTestEmail() {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "GenMyō Test <noreply@genmyo.ai>",
        to: ["gauravsingh345@gmail.com"],
        subject: "Welcome to GenMyō (Test Route)",
        html: `
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
                    Hi Gaurav,
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
        `,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend API error response:", data);
    } else {
      console.log("Test email sent successfully! Message ID:", data.id);
    }
  } catch (error) {
    console.error("Error sending test email:", error.message);
  }
}

sendTestEmail();
