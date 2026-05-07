import { NextRequest, NextResponse } from "next/server";

import { resend } from "@/lib/resend";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now - current.windowStart > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  rateLimitStore.set(ip, { count: current.count + 1, windowStart: current.windowStart });
  return false;
}

export async function POST(request: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, message } = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const recipient = process.env.CONTACT_EMAIL;
    if (!recipient) {
      return NextResponse.json({ error: "Contact email is not configured" }, { status: 500 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: recipient,
      subject: "Message from Website Visitor",
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
