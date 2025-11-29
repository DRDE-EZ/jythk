import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the contact form submission (in production, you'd save to database or send email)
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, implement one of these:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Save to database (MongoDB, PostgreSQL, etc.)
    // 3. Send to CRM system
    // 4. Forward to Wix contacts if using Wix CRM

    // For now, return success
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you shortly.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
