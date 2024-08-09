import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { title, content } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Ambil email dari variabel lingkungan
      pass: process.env.EMAIL_PASS, // Ambil password dari variabel lingkungan
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Ambil email dari variabel lingkungan
    to: 'rafiianindito29@gmail.com',
    subject: title,
    text: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
