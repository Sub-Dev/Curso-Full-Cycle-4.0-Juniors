class User {
// name: string;
// age: number;
constructor(public name: string, public age: number) {
 console.log("User constructor");
 this.name = name;
 this.age = age;
  }
}
  const user1 = new User("John Doe", 20);
  console.log(user1);


