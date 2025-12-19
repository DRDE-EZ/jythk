import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectType,
      companyName,
      contactName,
      email,
      phone,
      projectCapacity,
      location,
      timeline,
      budget,
      additionalDetails,
    } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("📋 Quote Request Received:", {
      projectType,
      companyName,
      contactName,
      email,
    });

    // Send email notification if SendGrid is configured
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL_TO) {
      try {
        // Dynamic import to avoid build-time issues
        const sgMail = (await import('@sendgrid/mail')).default;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
          from: process.env.SENDGRID_FROM_EMAIL || process.env.CONTACT_EMAIL_TO, // Verified sender email
          to: process.env.CONTACT_EMAIL_TO,
          subject: `🌞 New ${projectType.toUpperCase()} Quote Request - ${companyName}`,
          text: `
New Quote Request Received

Project Type: ${projectType.toUpperCase()}

Company Information:
-------------------
Company Name: ${companyName}
Contact Name: ${contactName}
Email: ${email}
Phone: ${phone}

Project Details:
----------------
Capacity: ${projectCapacity || 'Not specified'}
Location: ${location || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Budget: ${budget || 'Not specified'}

Additional Details:
------------------
${additionalDetails || 'None provided'}

---
Sent from JYT HK Quote Form
          `,
          html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .section { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
    .label { font-weight: bold; color: #667eea; display: inline-block; width: 140px; }
    .value { color: #333; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    h2 { color: #667eea; margin-top: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌞 New Quote Request</h1>
      <p style="margin: 0; font-size: 18px;">${projectType.toUpperCase()} Project</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Company Information</h2>
        <p><span class="label">Company Name:</span> <span class="value">${companyName}</span></p>
        <p><span class="label">Contact Person:</span> <span class="value">${contactName}</span></p>
        <p><span class="label">Email:</span> <span class="value"><a href="mailto:${email}">${email}</a></span></p>
        <p><span class="label">Phone:</span> <span class="value"><a href="tel:${phone}">${phone}</a></span></p>
      </div>

      <div class="section">
        <h2>Project Details</h2>
        <p><span class="label">Project Type:</span> <span class="value">${projectType.toUpperCase()}</span></p>
        <p><span class="label">Capacity:</span> <span class="value">${projectCapacity || 'Not specified'}</span></p>
        <p><span class="label">Location:</span> <span class="value">${location || 'Not specified'}</span></p>
        <p><span class="label">Timeline:</span> <span class="value">${timeline || 'Not specified'}</span></p>
        <p><span class="label">Budget:</span> <span class="value">${budget || 'Not specified'}</span></p>
      </div>

      ${additionalDetails ? `
      <div class="section">
        <h2>Additional Details</h2>
        <p style="white-space: pre-wrap;">${additionalDetails}</p>
      </div>
      ` : ''}

      <div class="footer">
        <p>This quote request was submitted via the JYT HK website.</p>
        <p>Please respond within 24 hours.</p>
      </div>
    </div>
  </div>
</body>
</html>
          `,
        };

        await sgMail.send(msg);
        console.log('✅ Quote email sent successfully via SendGrid');
        
        return NextResponse.json({
          success: true,
          message: "Quote request sent successfully!",
        });

      } catch (emailError) {
        console.error('SendGrid email error:', emailError);
        // Still return success to user, but log the email error
        return NextResponse.json({
          success: true,
          message: "Quote request received! (Email notification failed - check SendGrid config)",
        });
      }
    }

    // If SendGrid is not configured, just log the submission
    console.log('⚠️ SendGrid not configured. Quote data logged only.');
    
    return NextResponse.json({
      success: true,
      message: "Quote request received! We'll get back to you soon.",
    });

  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}
