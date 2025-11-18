export class User {

  constructor(public name: string, public age: number) {}
  getReportsEmployes(): void {
    console.log(`this.name: ${this.name} - Reports of employees`);
  }
}
export class Manager extends User {
}

export class Admin extends User {
getReportsAdmin(): void {
  console.log(`this.name: ${this.name} - Reports of admin`);
}
}

const user = new User("John Doe", 20);
const manager = new Manager("Jane Doe", 21);
const admin = new Admin("Jim Doe", 22);

user.getReportsEmployes();
manager.getReportsEmployes();
admin.getReportsAdmin();