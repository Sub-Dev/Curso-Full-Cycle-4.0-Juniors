import { User1 } from "./1.classes_objects.js";
class User {
private name: string;
private age: number;
constructor(public nameC: string, public ageC: number) {
 console.log("User constructor");
 this.name = nameC;
 this.age = ageC;
  }


changeAge(newAge: number): void {
  if (newAge <= 0 || newAge >= 120) {
    throw new Error("Idade inválida");
  }
  this.age = newAge;
}
}
  const user1 = new User1("John Doe", 20);
  const user2 = new User("Jane Doe", 21);
  console.log(user1);
  console.log(user2);


