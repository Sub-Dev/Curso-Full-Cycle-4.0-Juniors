export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this.validate();
  }


  getId(): string {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }

  private validate(): void {
    if (!this._id) {
      throw new Error("ID é obrigatório");
    }
    if (!this._name) {
      throw new Error("Nome é obrigatório");
    }
    if (!this._email) {
      throw new Error("Email é obrigatório");
    }
    if (!this._password) {
      throw new Error("Senha é obrigatória");
    }
  }
}