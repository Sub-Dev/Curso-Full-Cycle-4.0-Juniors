class StockValidator {
  validate(cart: any) {
    for (const item of cart.items) {
      if (item.stock < item.quantity) {
        throw new Error(`Produto ${item.name} sem estoque suficiente.`);
      }
    }
  }
}

class TaxCalculator {
  calculate(cart: any): number {
    let total = 0;
    for (const item of cart.items) {
      total += item.price * item.quantity;
    }
    const tax = total * 0.1;
    return total + tax;
  }
}

class PaymentProcessor {
  processPayment(userId: string, amount: number) {
    console.log(
      `Processando pagamento de R$${amount} para o usuário ${userId}`
    );
  }
}

class CheckoutService {
  constructor(
    private stockValidator: StockValidator,
    private taxCalculator: TaxCalculator,
    private paymentProcessor: PaymentProcessor
  ) {}

  processCheckout(cart: any, userId: string) {
    this.stockValidator.validate(cart);
    const totalWithTaxes = this.taxCalculator.calculate(cart);
    this.paymentProcessor.processPayment(userId, totalWithTaxes);
  }
}
