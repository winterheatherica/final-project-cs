// ./api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    // Konfigurasi transport nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rafii.anindito.tik22@mhsw.pnj.ac.id', // email pengirim
        pass: 'IG5FIB5F', // gunakan App Password di sini jika menggunakan 2FA
      },
    });

    // Opsi email
    const mailOptions = {
      from: 'rafii.anindito.tik22@mhsw.pnj.ac.id',
      to: 'rafiianindito29@gmail.com', // email penerima
      subject: `${title}`,
      text: `${content}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
