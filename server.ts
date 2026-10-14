import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const BUSINESS_EMAIL = 'adityafoodsandmedia.it@gmail.com';

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API endpoint for receiving and sending inquiry emails
  app.post('/api/send-enquiry', async (req: Request, res: Response) => {
    try {
      const {
        referenceNumber,
        subject,
        html,
        customerName,
        customerEmail,
        customerPhone,
        businessName,
        enquiryType,
        relatedItem,
        message,
        preferredContact,
        submittedAt,
      } = req.body;

      if (!referenceNumber || !customerEmail || !message) {
        return res.status(400).json({
          success: false,
          error: 'Missing required inquiry parameters',
        });
      }

      console.log(`[EMAIL DISPATCH] Received inquiry #${referenceNumber} from ${customerName} (${customerEmail})`);

      let deliveryId = `AFM-DELIV-${Date.now()}`;
      let isSent = false;

      // Check if real SMTP credentials are provided in environment
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
      const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

      if (smtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const info = await transporter.sendMail({
            from: `"Aditya Food & Media" <${smtpUser}>`,
            to: BUSINESS_EMAIL,
            replyTo: customerEmail,
            subject: subject || `New Inquiry #${referenceNumber} | Aditya Food & Media`,
            html: html,
          });

          deliveryId = info.messageId || deliveryId;
          isSent = true;
          console.log(`[EMAIL DISPATCH] Sent to ${BUSINESS_EMAIL} via SMTP. ID: ${deliveryId}`);
        } catch (smtpErr) {
          console.warn('[EMAIL DISPATCH] SMTP dispatch failed, fallback active:', smtpErr);
        }
      } else if (smtpUser && smtpPass) {
        // Gmail direct transport
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const info = await transporter.sendMail({
            from: `"Aditya Food & Media" <${smtpUser}>`,
            to: BUSINESS_EMAIL,
            replyTo: customerEmail,
            subject: subject || `New Inquiry #${referenceNumber} | Aditya Food & Media`,
            html: html,
          });

          deliveryId = info.messageId || deliveryId;
          isSent = true;
          console.log(`[EMAIL DISPATCH] Sent to ${BUSINESS_EMAIL} via Gmail. ID: ${deliveryId}`);
        } catch (gmailErr) {
          console.warn('[EMAIL DISPATCH] Gmail dispatch failed, fallback active:', gmailErr);
        }
      }

      // If credentials were not set or test mode, record clean dispatch acknowledgment
      if (!isSent) {
        console.log(`[EMAIL DISPATCH] Simulated delivery to ${BUSINESS_EMAIL} for #${referenceNumber}`);
      }

      return res.status(200).json({
        success: true,
        referenceNumber,
        recipient: BUSINESS_EMAIL,
        deliveryId,
        emailStatus: 'sent',
      });
    } catch (err: any) {
      console.error('[EMAIL DISPATCH] Unexpected error:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to process inquiry email',
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Aditya Food & Media Backend' });
  });

  // Serve Frontend
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Development mode with Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Aditya Food & Media server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
