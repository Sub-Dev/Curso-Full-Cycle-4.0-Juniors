class User {
  static count = 0;
  constructor(public name: string) {
}

static incrementCount(): void {
  this.count++;
}
}
const user = new User("John Doe");
console.log(user.name);
console.log(User.count);
User.incrementCount();
console.log(User.count);
