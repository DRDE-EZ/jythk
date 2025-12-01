import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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

    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email notification if SendGrid is configured
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL_TO) {
      try {
        const emailContent = {
          to: process.env.CONTACT_EMAIL_TO, // Your email address
          from: process.env.SENDGRID_FROM_EMAIL || process.env.CONTACT_EMAIL_TO, // Verified sender email
          replyTo: email, // Customer's email for easy reply
          subject: `🔔 New Contact Form: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #2563eb; margin-top: 0;">📧 New Contact Form Submission</h2>
                
                <div style="background-color: #eff6ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                  <p style="margin: 5px 0;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <div style="background-color: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #374151;">Message:</h3>
                  <p style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">${message}</p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
                  <p>This email was sent from your website contact form at <a href="https://jythk.vercel.app">jythk.vercel.app</a></p>
                </div>
              </div>
            </div>
          `,
          text: `
New Contact Form Submission

Subject: ${subject}
From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Received: ${new Date().toLocaleString()}

Message:
${message}

---
This email was sent from your website contact form.
          `.trim()
        };

        await sgMail.send(emailContent);
        console.log('✅ Email sent successfully via SendGrid');

        return NextResponse.json(
          { 
            success: true, 
            message: 'Your message has been sent successfully! We\'ll get back to you soon.',
            method: 'email'
          },
          { status: 200 }
        );

      } catch (emailError) {
        console.error('SendGrid email error:', emailError);
        
        // Return success even if email fails (user doesn't need to know)
        return NextResponse.json(
          { 
            success: true, 
            message: 'Your message has been received.',
            warning: 'Email notification failed but form was submitted'
          },
          { status: 200 }
        );
      }
    }

    // If SendGrid is not configured, just log the submission
    console.log('⚠️ SendGrid not configured. Form data logged only.');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received.',
        method: 'log-only'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
