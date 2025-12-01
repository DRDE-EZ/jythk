import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, location, interest, additionalInfo } = body;

    // Validate required fields
    if (!name || !email || !location || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Partner Form Submission:', {
      name,
      email,
      location,
      interest,
      additionalInfo,
      timestamp: new Date().toISOString(),
    });

    // Map interest to readable format
    const interestMap: Record<string, string> = {
      'rooftop-installation': 'Rooftop Installation',
      'wholesale': 'Wholesale',
      'land-partnership': 'Land Partnership',
      'other': 'Other'
    };
    const interestLabel = interestMap[interest] || interest;

    // Send email notification if SendGrid is configured
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL_TO) {
      try {
        // Dynamic import to avoid build-time issues
        const sgMail = (await import('@sendgrid/mail')).default;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const emailContent = {
          to: process.env.CONTACT_EMAIL_TO, // Your email address
          from: process.env.SENDGRID_FROM_EMAIL || process.env.CONTACT_EMAIL_TO, // Verified sender email
          replyTo: email, // Customer's email for easy reply
          subject: `🤝 New Partnership Inquiry: ${interestLabel}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #7c3aed; margin-top: 0;">🤝 New Partnership Inquiry</h2>
                
                <div style="background-color: #faf5ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
                  <p style="margin: 5px 0;"><strong>Interest:</strong> <span style="background-color: #7c3aed; color: white; padding: 3px 10px; border-radius: 3px; font-size: 14px;">${interestLabel}</span></p>
                  <p style="margin: 5px 0;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
                </div>

                ${additionalInfo ? `
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #374151;">Additional Information:</h3>
                  <p style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">${additionalInfo}</p>
                </div>
                ` : ''}

                <div style="background-color: #ecfdf5; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #10b981;">
                  <h3 style="margin-top: 0; color: #065f46;">Quick Actions:</h3>
                  <p style="margin: 5px 0;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">📧 Reply to ${name}</a>
                  </p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
                  <p>This email was sent from your partnership form at <a href="https://jythk.vercel.app">jythk.vercel.app</a></p>
                </div>
              </div>
            </div>
          `,
          text: `
New Partnership Inquiry

Name: ${name}
Email: ${email}
Location: ${location}
Interest: ${interestLabel}
Received: ${new Date().toLocaleString()}

${additionalInfo ? `Additional Information:\n${additionalInfo}\n` : ''}
---
This email was sent from your partnership form.
          `.trim()
        };

        await sgMail.send(emailContent);
        console.log('✅ Partnership email sent successfully via SendGrid');

        return NextResponse.json(
          { 
            success: true, 
            message: 'Thank you for your partnership inquiry! We\'ll contact you within 24 hours.',
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
            message: 'Your partnership inquiry has been received.',
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
        message: 'Your partnership inquiry has been received.',
        method: 'log-only'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Partner form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process partnership inquiry',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
