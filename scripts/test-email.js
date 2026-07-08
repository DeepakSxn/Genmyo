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
        from: "GenMyō Test <admin@genmyo.ai>",
        to: ["gauravsingh345@gmail.com"],
        subject: "GenMyō Serverless Test Email",
        html: `
          <h1>Test Successful!</h1>
          <p>This is a test email sent from the GenMyō test script to verify that your Resend API key is working.</p>
          <p><strong>Recipient:</strong> gauravsingh345@gmail.com</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
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
