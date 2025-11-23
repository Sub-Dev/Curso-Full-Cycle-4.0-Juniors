class EmailNotificationService {
  sendEmail(provider: string, to: string, message: string): void {
    if (provider === "SMTP") {
      const smtpServer = process.env.SMTP_SERVER;
      const username = process.env.SMTP_USERNAME;
      const password = process.env.SMTP_PASSWORD;

      if (!smtpServer || !username || !password) {
        throw new Error(
          "Missing SMTP configuration: Please set SMTP_SERVER, SMTP_USERNAME, and SMTP_PASSWORD in the environment."
        );
      }

      console.log(`SMTP: Sending email to ${to}`);
      console.log(`SMTP Config: Server=${smtpServer}, User=${username}`);
      // Aqui seria a lógica real para enviar via SMTP.
    } else if (provider === "SES") {
      const awsRegion = process.env.AWS_REGION;
      const awsAccessKey = process.env.AWS_ACCESS_KEY;
      const awsSecretKey = process.env.AWS_SECRET_KEY;

      if (!awsRegion || !awsAccessKey || !awsSecretKey) {
        throw new Error(
          "Missing AWS SES configuration: Please set AWS_REGION, AWS_ACCESS_KEY, and AWS_SECRET_KEY in the environment."
        );
      }

      console.log(`SES: Sending email to ${to}`);
      console.log(`AWS Config: Region=${awsRegion}`);
      // Aqui seria a lógica real para enviar via AWS SES.
    } else if (provider === "SendGrid") {
      const apiKey = process.env.SENDGRID_API_KEY;

      if (!apiKey) {
        throw new Error(
          "Missing SendGrid configuration: Please set SENDGRID_API_KEY in the environment."
        );
      }

      console.log(`SendGrid: Sending email to ${to}`);
      console.log(`SendGrid Config: API Key=${apiKey}`);
      // Aqui seria a lógica real para enviar via SendGrid.
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}

// Uso
const emailService = new EmailNotificationService();

// Enviando via SMTP
emailService.sendEmail("SMTP", "user1@example.com", "Hello via SMTP!");

// Enviando via AWS SES
emailService.sendEmail("SES", "user2@example.com", "Hello via SES!");

// Enviando via SendGrid
emailService.sendEmail("SendGrid", "user3@example.com", "Hello via SendGrid!");
