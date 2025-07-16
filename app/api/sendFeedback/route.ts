import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Securely initialize Resend instance with the API key from env
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { email, message } = await req.json();

  try {
    await resend.emails.send({
      from: "Chef Subhan's Kitchen <onboarding@resend.dev>",
      to: "subhanzia051@gmail.com",
      subject: "🍽️ New Kitchen Feedback!",
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
