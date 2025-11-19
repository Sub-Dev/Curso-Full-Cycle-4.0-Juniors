interface ProcessPaymentInterface {
 readonly taxRate: number;
  startPayment(amount: number): Promise<String>;
  confirmPayment(paymentId: string): Promise<String>;
  cancelPayment(paymentId: string): Promise<String>;
  getPaymentStatus(paymentId: string): Promise<String>;
}

class PixPayment implements ProcessPaymentInterface {
  taxRate = 0.1;
  startPayment(amount: number): Promise<String> {
    return Promise.resolve("Payment started");
  }
  confirmPayment(paymentId: string): Promise<String> {
    return Promise.resolve("Payment confirmed");
  }
  cancelPayment(paymentId: string): Promise<String> {
    return Promise.resolve("Payment cancelled");
  }
  getPaymentStatus(paymentId: string): Promise<String> {
    return Promise.resolve("Payment status");
  }
}

class PagarMePayment implements ProcessPaymentInterface {
  taxRate = 0.2;
  startPayment(amount: number): Promise<String> {
    return Promise.resolve("Payment started");
  }
  confirmPayment(paymentId: string): Promise<String> {
    return Promise.resolve("Payment confirmed");
  }
  cancelPayment(paymentId: string): Promise<String> {
    return Promise.resolve("Payment cancelled");
  }
  getPaymentStatus(paymentId: string): Promise<String> {
    return Promise.resolve("Payment status");
  }
}

class MercadoPagoPayment  {
  taxRate = 0.15;
}
// Só  aceita no parametro parametros que implementam a interface ProcessPaymentInterface
const processPayment = async (payment: ProcessPaymentInterface) => {
const idPayment = await payment.startPayment(100);
console.log(`Payment started: ${idPayment}`);
const status = await payment.getPaymentStatus(String(idPayment));
console.log(`Payment status: ${status}`);
}

const pixPayment = new PixPayment();
const pagarMePayment = new PagarMePayment();
const mercadoPagoPayment = new MercadoPagoPayment();

processPayment(pixPayment);
processPayment(pagarMePayment);
// processPayment(mercadoPagoPayment);

export {}