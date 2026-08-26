import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Measurement Protocol proxy for Mirror.
 * Fires whatsapp_conversation_started (and optional reflection_completed)
 * against the original web session's client_id.
 *
 * Auth: set GA4_MP_SECRET in Vercel; Mirror must send header x-genmyo-mp-secret.
 * Also requires GA4_MP_API_SECRET from GA4 Admin → Data Stream → Measurement Protocol.
 *
 * Never accept phone/email/name/context in this payload.
 */

const MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || "G-NJ54MSB84D";
const MP_API_SECRET = process.env.GA4_MP_API_SECRET || "";
const GATE_SECRET = process.env.GA4_MP_SECRET || "";

type MatchedOn = "phone" | "refcode";

interface MpBody {
  event_name?: "whatsapp_conversation_started" | "reflection_completed";
  client_id?: string;
  session_id?: string;
  lead_id?: string;
  minutes_to_reply?: number;
  matched_on?: MatchedOn;
  debug?: boolean;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, x-genmyo-mp-secret");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  if (GATE_SECRET) {
    const provided = request.headers["x-genmyo-mp-secret"];
    if (provided !== GATE_SECRET) {
      return response.status(401).json({ ok: false, error: "Unauthorized" });
    }
  }

  if (!MP_API_SECRET) {
    console.error("Missing GA4_MP_API_SECRET");
    return response.status(500).json({
      ok: false,
      error: "Server misconfigured: GA4_MP_API_SECRET not set",
    });
  }

  const body = (request.body || {}) as MpBody;
  const eventName = body.event_name || "whatsapp_conversation_started";
  const clientId = typeof body.client_id === "string" ? body.client_id.trim() : "";
  const leadId = typeof body.lead_id === "string" ? body.lead_id.trim() : "";

  if (!clientId) {
    return response.status(400).json({ ok: false, error: "client_id is required" });
  }
  if (!leadId) {
    return response.status(400).json({ ok: false, error: "lead_id is required" });
  }

  // Reject obvious PII keys if Mirror accidentally sends them
  const forbidden = ["phone", "whatsapp", "email", "name", "firstName", "context", "notes"];
  for (const key of forbidden) {
    if (key in (request.body || {})) {
      return response.status(400).json({
        ok: false,
        error: `Do not send PII field: ${key}`,
      });
    }
  }

  const params: Record<string, string | number> = {
    lead_id: leadId,
    engagement_time_msec: 1,
  };

  if (body.session_id) params.session_id = String(body.session_id);
  if (typeof body.minutes_to_reply === "number" && Number.isFinite(body.minutes_to_reply)) {
    params.minutes_to_reply = Math.max(0, Math.round(body.minutes_to_reply));
  }
  if (body.matched_on === "phone" || body.matched_on === "refcode") {
    params.matched_on = body.matched_on;
  }

  const endpoint = body.debug
    ? "https://www.google-analytics.com/debug/mp/collect"
    : "https://www.google-analytics.com/mp/collect";

  const url = `${endpoint}?measurement_id=${encodeURIComponent(MEASUREMENT_ID)}&api_secret=${encodeURIComponent(MP_API_SECRET)}`;

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: eventName, params }],
      }),
    });

    const text = await upstream.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!upstream.ok) {
      console.error("GA4 MP error:", upstream.status, text);
      return response.status(upstream.status).json({ ok: false, error: data });
    }

    return response.status(200).json({
      ok: true,
      event_name: eventName,
      lead_id: leadId,
      debug: Boolean(body.debug),
      validation: data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "MP request failed";
    console.error("GA4 MP forward error:", error);
    return response.status(502).json({ ok: false, error: message });
  }
}
