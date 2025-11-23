class CheckoutService {
  processCheckout(cart: any, userId: string) {
    // Validação de estoque
    for (const item of cart.items) {
      if (item.stock < item.quantity) {
        throw new Error(`Produto ${item.name} sem estoque suficiente.`);
      }
    }

    // Cálculo de impostos e total
    let total = 0;
    for (const item of cart.items) {
      total += item.price * item.quantity;
    }
    const tax = total * 0.1;
    total += tax;

    console.log(`Total com impostos: R$${total}`);

    // Processamento de pagamento
    console.log(`Processando pagamento para o usuário ${userId}`);
  }
}
