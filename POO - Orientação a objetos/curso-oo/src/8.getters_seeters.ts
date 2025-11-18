class User {
  constructor( private _name: string, private _age: number,private _email: string,private _password: string,private _createdAt: Date,private _updatedAt: Date) {}
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    if (newName.length < 3) {
      throw new Error("O nome deve ter mais de 3 caracteres");
    }
    this._name = newName;
  }
}

const user = new User("John Doe", 20,"john@example.com","123456",new Date(),new Date());
console.log(user.name);
console.log(user.name);