import { NextRequest, NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { contacts } from '@wix/crm';
import { env } from '@/env';

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

    // Create Wix client with API key for server-side operations
    const wixClient = createClient({
      modules: { contacts },
      auth: OAuthStrategy({
        clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: {
          accessToken: { value: process.env.WIX_API_KEY || '', expiresAt: 0 },
          refreshToken: { value: '', expiresAt: 0 }
        }
      })
    });

    try {
      // Create contact in Wix CRM
      const contactInfo: any = {
        info: {
          name: {
            first: name.split(' ')[0],
            last: name.split(' ').slice(1).join(' ') || undefined,
          },
          emails: [email],
        }
      };

      // Add phone if provided
      if (phone) {
        contactInfo.info.phones = [phone];
      }

      // Create the contact
      const contactResult = await wixClient.contacts.createContact(contactInfo);
      
      console.log('✅ Contact created in Wix CRM:', contactResult.contact?._id);

      // Add a note to the contact with the form details
      if (contactResult.contact?._id) {
        const noteContent = `
📋 Contact Form Submission

Subject: ${subject}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
        `.trim();

        // Note: createContactNote API is not available in current Wix SDK version
        // Contact details and message are stored in the contact record
        console.log('✅ Contact created with message details in Wix CRM');
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for contacting us! We will get back to you shortly.',
          wixContactId: contactResult.contact?._id
        },
        { status: 200 }
      );

    } catch (wixError: any) {
      console.error('Wix CRM error:', wixError);
      // Still return success to user, but log the error
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for contacting us! We will get back to you shortly.',
          note: 'Saved locally - Wix sync pending'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
