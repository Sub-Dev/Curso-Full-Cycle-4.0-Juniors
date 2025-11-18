export class Address {
  private street: string;
  private number: number;

  constructor(  street: string,
    number: number) {
    this.street = street;
    this.number = number;
  }

  showAddress(): string {
    return `${this.street}, ${this.number}`;
  }
}

export class User {
  private name: string;
  private age: number;
  private address: Address[];

  constructor(  
    name: string,
    age: number,
    address: Address[]) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
    
    showAddress(): void {
      this.address.forEach((address: Address) => {
       console.log(address.showAddress());
      });
     }

}

const user = new User("John Doe", 20, [new Address("Main St", 123)]);