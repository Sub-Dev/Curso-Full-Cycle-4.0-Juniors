class User {
  constructor(public name: string, public age: number,email: string,password: string) {}
}

class Manager extends User {
  constructor(public name: string, public age: number,email: string,password: string,public role: string = "manager") {
    super(name, age,email,password);
  }
}

class Admin extends User {
  constructor(public name: string, public age: number,email: string,password: string,public role: string = "manager") {
    super(name, age,email,password);
  }
} 
const manager = new Manager("Jane Doe", 21,"jane@example.com","123456");
const super_manager = new Manager("Super Jane Doe", 22,"super_jane@example.com","123456","super_manager");