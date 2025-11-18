export class User1 {
name: string;
age: number;
constructor(public nameC: string, public ageC: number) {
 console.log("User constructor");
 this.name = nameC;
 this.age = ageC;
  }
}
  const user1 = new User1("John Doe", 20);
  console.log(user1);


