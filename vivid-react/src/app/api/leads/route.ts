import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

const leadSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional().default(""),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  vehicle: z.string().min(2).max(150),
  services: z.array(z.string()).min(1),
  message: z.string().max(2000).optional().default(""),
  website: z.string().optional().default(""),
});

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hitRateLimit(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp <= RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function calculateSpamScore(input: { message: string; vehicle: string; services: string[]; userAgent: string }) {
  let score = 0;
  const text = `${input.message} ${input.vehicle}`.toLowerCase();

  const spamSignals = ["crypto", "casino", "loan", "seo", "backlink", "viagra", "telegram"];
  if (spamSignals.some((signal) => text.includes(signal))) {
    score += 6;
  }

  if (input.message.length > 1500) {
    score += 2;
  }

  if (input.services.length === 0) {
    score += 2;
  }

  if (!input.userAgent || input.userAgent.toLowerCase().includes("bot")) {
    score += 3;
  }

  return score;
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const ip = getClientIp(request);

    if (hitRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const spamScore = calculateSpamScore({
      message: parsed.data.message,
      vehicle: parsed.data.vehicle,
      services: parsed.data.services,
      userAgent,
    });

    const { error } = await supabaseAdmin.from("leads").insert({
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      vehicle: parsed.data.vehicle,
      services: parsed.data.services,
      message: parsed.data.message,
      source: "website",
      spam_score: spamScore,
      is_spam: spamScore >= 6,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Missing Supabase")) {
      return NextResponse.json({ error: "Server is missing Supabase configuration." }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
