import nodemailer from 'nodemailer'

const sendEmail = async ({ name, email, message }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email to YOU (notification)
    const notificationMail = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🚀 New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #fff; padding: 30px; border-radius: 12px;">
          <h1 style="color: #2dd4bf; margin: 0 0 20px 0;">New Contact Form Submission</h1>
          
          <div style="background: #151530; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #2dd4bf;">Name:</strong> <span style="color: #fff;">${name}</span></p>
            <p style="margin: 0;"><strong style="color: #2dd4bf;">Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
          </div>
          
          <div style="background: #151530; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #2dd4bf;">Message:</strong></p>
            <p style="margin: 0; color: #ddd; line-height: 1.6;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #262626; margin: 30px 0;" />
          
          <p style="color: #666; font-size: 12px; text-align: center; margin: 0;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    }

    // Auto-reply to sender
    const autoReplyMail = {
      from: `"Rehan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #fff; padding: 30px; border-radius: 12px;">
          <h1 style="color: #2dd4bf; margin: 0 0 20px 0;">Hi ${name}, 👋</h1>
          
          <p style="color: #ddd; line-height: 1.6;">Thank you for reaching out! I've received your message and will get back to you as soon as possible — usually within 24 hours.</p>
          
          <div style="background: #151530; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #888; font-size: 12px;">YOUR MESSAGE:</p>
            <p style="margin: 0; color: #ddd; font-style: italic;">"${message}"</p>
          </div>
          
          <p style="color: #ddd; line-height: 1.6;">Looking forward to connecting with you!</p>
          
          <p style="color: #2dd4bf; margin: 30px 0 0 0; font-weight: bold;">— Rehan</p>
          <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">Full-Stack Web Developer</p>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(notificationMail)
    await transporter.sendMail(autoReplyMail)

    console.log('✅ Emails sent successfully')
    return true
  } catch (error) {
    console.error('❌ Email error:', error.message)
    return false
  }
}

export default sendEmail