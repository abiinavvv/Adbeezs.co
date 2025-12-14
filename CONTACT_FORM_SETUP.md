# Contact Form Setup Guide

## ✅ Implemented Features

1. **Client-side Validation**
   - Name: Required, minimum 2 characters
   - Email: Required, valid email format
   - Message: Required, minimum 10 characters
   - Real-time error display
   - Error clearing when user types

2. **Form Submission Handler**
   - API route created at `/app/api/contact/route.ts`
   - Server-side validation
   - Email will be sent to: `abhinavaneesh2@gmail.com`

3. **Loading State**
   - Button shows spinner and "Sending..." text during submission
   - Button is disabled during submission
   - Prevents multiple submissions

4. **Success/Error Messages**
   - Animated success/error messages
   - Clear visual feedback
   - Form resets on successful submission

## 📧 Email Configuration

The contact form is currently set up to send emails to **abhinavaneesh2@gmail.com**.

### Option 1: Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```
4. Uncomment the Resend code in `app/api/contact/route.ts` (lines 47-66)
5. Update the `from` email address in the API route

### Option 2: Using Nodemailer

1. Install nodemailer:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```
2. Add SMTP credentials to `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
3. Update the API route to use nodemailer

### Option 3: Using SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   ```
4. Update the API route to use SendGrid

### Option 4: Using a Form Service

You can also use services like:
- [Formspree](https://formspree.io)
- [Web3Forms](https://web3forms.com)
- [EmailJS](https://www.emailjs.com)

## 🔧 Current Implementation

Currently, the form:
- ✅ Validates all fields
- ✅ Shows loading state
- ✅ Displays success/error messages
- ✅ Logs submissions to console (for development)

**For production**, you need to integrate with an email service (see options above).

## 📝 Form Fields

- **Name**: Required, min 2 characters
- **Email**: Required, valid email format
- **Message**: Required, min 10 characters

## 🎨 UI Features

- Real-time validation feedback
- Error messages appear below each field
- Success/error banners with icons
- Loading spinner in submit button
- Form resets on successful submission
- Smooth animations for all states

## 🚀 Testing

1. Fill out the form with valid data
2. Submit and check console for the logged submission
3. In production, check the recipient email inbox

---

**Note**: The email recipient is currently set to `abhinavaneesh2@gmail.com` in the API route. You can change this in `app/api/contact/route.ts` line 30.

