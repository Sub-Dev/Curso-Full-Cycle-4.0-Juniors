class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string) { }
}

class SaleItem {
  constructor(
    public product: Product,
    public quantity: number) { }
}
class Client {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public document: string) { }
}

class Address {
  constructor(
    public number: number,
    public street: string,
    public city: string,
    public state: string) { }
}

class Sale {
  public id: string;
  constructor(
    public client: Client,
    public address: Address,
    public payment: Payment,
    public product: SaleItem[],

  ) {
    this.id = this.generateId();
  }
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}



abstract class Payment {
  constructor(
    public value: number,
    public date: Date) { }
}

class PaymentPix extends Payment {
  constructor(
    public value: number,
    public date: Date) {
    super(value, date);
  }
}
class PaymentCreditCard extends Payment {
  constructor(
    public value: number,
    public date: Date) {
    super(value, date);
  }
}


const sale = new Sale(
  new Client("1", "John Doe", "john.doe@example.com", "1234567890"),
  new Address(123, "Main St", "Anytown", "CA"),
  new PaymentPix(100, new Date()),
  [new SaleItem(new Product("1", "Product 1", 100, "Product 1 description"), 1)]
);
export { }