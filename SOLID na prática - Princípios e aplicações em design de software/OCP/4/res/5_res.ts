interface EmailNotification {
  send(to: string, message: string): void;
}

class SMTPEmailNotification implements EmailNotification {
  constructor(
    private smtpServer: string,
    private username: string,
    private password: string
  ) {}

  send(to: string, message: string): void {
    console.log(`SMTP: Sending email to ${to}`);
    console.log(
      `SMTP Config: Server=${this.smtpServer}, User=${this.username}`
    );
  }
}

class SESEmailNotification implements EmailNotification {
  constructor(
    private awsRegion: string,
    private awsAccessKey: string,
    private awsSecretKey: string
  ) {}

  send(to: string, message: string): void {
    console.log(`SES: Sending email to ${to}`);
    console.log(`AWS Config: Region=${this.awsRegion}`);
  }
}

class SendGridEmailNotification implements EmailNotification {
  constructor(private apiKey: string) {}

  send(to: string, message: string): void {
    console.log(`SendGrid: Sending email to ${to}`);
    console.log(`SendGrid Config: API Key=${this.apiKey}`);
  }
}

abstract class EmailNotificationCreator {
  abstract createNotification(): EmailNotification;

  sendEmail(to: string, message: string): void {
    const notification = this.createNotification();
    notification.send(to, message);
  }
}

class SMTPNotificationCreator extends EmailNotificationCreator {
  createNotification(): EmailNotification {
    const smtpServer = process.env.SMTP_SERVER;
    const username = process.env.SMTP_USERNAME;
    const password = process.env.SMTP_PASSWORD;

    if (!smtpServer || !username || !password) {
      throw new Error(
        "Missing SMTP configuration: Please set SMTP_SERVER, SMTP_USERNAME, and SMTP_PASSWORD in the environment."
      );
    }

    return new SMTPEmailNotification(smtpServer, username, password);
  }
}

class SESEmailNotificationCreator extends EmailNotificationCreator {
  createNotification(): EmailNotification {
    const awsRegion = process.env.AWS_REGION;
    const awsAccessKey = process.env.AWS_ACCESS_KEY;
    const awsSecretKey = process.env.AWS_SECRET_KEY;

    if (!awsRegion || !awsAccessKey || !awsSecretKey) {
      throw new Error(
        "Missing AWS SES configuration: Please set AWS_REGION, AWS_ACCESS_KEY, and AWS_SECRET_KEY in the environment."
      );
    }

    return new SESEmailNotification(awsRegion, awsAccessKey, awsSecretKey);
  }
}

class SendGridEmailNotificationCreator extends EmailNotificationCreator {
  createNotification(): EmailNotification {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Missing SendGrid configuration: Please set SENDGRID_API_KEY in the environment."
      );
    }

    return new SendGridEmailNotification(apiKey);
  }
}

class EmailNotificationService {
  sendEmail(provider: EmailNotificationCreator): void {
    provider.sendEmail("user@example", "Hello via EmailNotificationService!");
  }
}

const notificationService = new EmailNotificationService();
notificationService.sendEmail(new SMTPNotificationCreator());
notificationService.sendEmail(new SESEmailNotificationCreator());
notificationService.sendEmail(new SendGridEmailNotificationCreator());

// const smtpCreator = new SMTPNotificationCreator();
// smtpCreator.sendEmail("user1@example.com", "Hello via SMTP!");

// const sesCreator = new SESEmailNotificationCreator();
// sesCreator.sendEmail("user@example", "Hello via SES!");

// const sendGridCreator = new SendGridEmailNotificationCreator();
// sendGridCreator.sendEmail("user@example", "Hello via SendGrid!");
