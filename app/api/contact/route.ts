import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = {
      to: 'abhinavaneesh2@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the Adbeezs contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send email using a service (you can integrate with Resend, SendGrid, etc.)
    // For now, we'll use a simple fetch to a service or log it
    // You can replace this with your preferred email service
    
    // Option 1: Using Resend (recommended for production)
    // Uncomment and configure if you have Resend API key
    /*
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'contact@adbeezs.co',
        to: emailContent.to,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (!resendResponse.ok) {
      throw new Error('Failed to send email');
    }
    */

    // Option 2: Using Nodemailer (requires SMTP configuration)
    // Option 3: For development, we'll just return success
    // In production, integrate with a proper email service

    // Log the submission (for development)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

