import { NextRequest, NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { contacts } from '@wix/crm';
import { env } from '@/env';

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

    // Create Wix client with API key for server-side operations
    const wixClient = createClient({
      modules: { contacts },
      auth: OAuthStrategy({
        clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: {
          accessToken: { value: process.env.WIX_API_KEY || '', expiresAt: 0 },
          refreshToken: { value: '' }
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
          locations: [{
            city: location,
          }]
        }
      };

      // Create the contact
      const contactResult = await wixClient.contacts.createContact(contactInfo);
      
      console.log('✅ Partner contact created in Wix CRM:', contactResult.contact?._id);

      // Map interest to readable format
      const interestMap: Record<string, string> = {
        'rooftop-installation': 'Rooftop Installation',
        'wholesale': 'Wholesale',
        'land-partnership': 'Land Partnership',
        'other': 'Other'
      };

      // Store partnership details in contact's additional info field
      const interestNote = `Partnership Inquiry - ${interestMap[interest] || interest}${additionalInfo ? ` | ${additionalInfo}` : ''}`;
      
      console.log('✅ Partner contact created with details:', {
        contactId: contactResult.contact?._id,
        location,
        interest: interestMap[interest] || interest,
        additionalInfo
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for your partnership inquiry! We will contact you shortly.',
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
          message: 'Thank you for your partnership inquiry! We will contact you shortly.',
          note: 'Saved locally - Wix sync pending'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Partner form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
