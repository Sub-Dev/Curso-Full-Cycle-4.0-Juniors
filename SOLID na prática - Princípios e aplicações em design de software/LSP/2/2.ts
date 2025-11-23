class User {
  constructor(
    public username: string,
    private financialData: string = "Dados financeiros do usuário."
  ) {}

  hasAccess(): boolean {
    return true; // Por padrão, todos os usuários têm acesso
  }

  getFinancialData(): string {
    return this.financialData; // Retorna os dados financeiros do usuário cartao de credito
  }
}

class OneTimeUser extends User {
  constructor(username: string) {
    super(username);
  }

  hasAccess(): boolean {
    return false; // Visitantes não têm acesso
  }

  // Sobrescrevendo o método para causar comportamento inesperado
  getFinancialData(): string {
    return "Cartao de credito temporario: 00000000";
  }
}

class GuestUser extends User {
  constructor(username: string) {
    super(username);
  }

  hasAccess(): boolean {
    return false; // Visitantes não têm acesso
  }

  // Sobrescrevendo o método para causar comportamento inesperado
  getFinancialData(): string {
    throw new Error("GuestUser não possui dados financeiros."); // Simulando ausência de dados
  }
}

// Função que processa o pagamento
function makePayment(user: User, amount: number): void {
  console.log(
    `Iniciando pagamento para ${user.username} no valor de R$${amount.toFixed(
      2
    )}...`
  );

  try {
    // Tentando acessar os dados financeiros, independentemente de "hasAccess"
    const financialData = user.getFinancialData();
    console.log(`Dados financeiros obtidos: ${financialData}`);
    console.log(`Pagamento de R$${amount.toFixed(2)} processado com sucesso.`);
  } catch (error) {
    console.error(
      `Erro ao processar pagamento para ${user.username}: ${
        (error as Error).message
      }`
    );
  }
}

// Testando com diferentes tipos de usuários
const regularUser = new User("João");
const guestUser = new GuestUser("Visitante");

makePayment(regularUser, 100.0);
// Saída esperada:
// Iniciando pagamento para João no valor de R$100.00...
// Dados financeiros obtidos: Dados financeiros do usuário
// Pagamento de R$100.00 processado com sucesso.

makePayment(guestUser, 50.0);
// Comportamento inesperado (erro):
// Iniciando pagamento para Visitante no valor de R$50.00...
// Erro ao processar pagamento para Visitante: GuestUser não possui dados financeiros.
