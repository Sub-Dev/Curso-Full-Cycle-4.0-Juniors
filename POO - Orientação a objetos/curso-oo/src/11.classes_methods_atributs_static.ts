abstract class Payment {
 protected abstract tax: number;
  constructor(
    public amount: number,
    public date: Date,
    public description: string
  ) {}

 getPaymentInMonth(payments: Payment[]): string{
    return `Payment of ${this.amount} on ${this.date.toDateString()}: ${this.description}`;
  }

processPayment(payments: Payment[]): void {
  const newAmount = this.amount + this.tax;
  console.log(`Payment of ${this.amount} on ${this.date.toDateString()}: ${this.description}`);
}

}

class PaymentPix extends Payment {
  protected tax = 0.05;
}
class PaymentCreditCard extends Payment {
  protected tax = 0.1;
}
class PaymentDebitCard extends Payment {
  protected tax = 0.02;
}
class PaymentPaypal extends Payment {
  protected tax = 0.03;
}

const pixPayment = new PaymentPix(100, new Date(), "Pix payment");
const creditCardPayment = new PaymentCreditCard(100, new Date(), "Credit card payment");
const debitCardPayment = new PaymentDebitCard(100, new Date(), "Debit card payment");
const paypalPayment = new PaymentPaypal(100, new Date(), "Paypal payment");

export{}