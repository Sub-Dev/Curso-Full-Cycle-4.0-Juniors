

class CpfValueObject {
  constructor(
    public value: string) {
    this.validate();
  }
  validate(): void {
    if (!this.value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      throw new Error("CPF inválido");
    }
  }
}

enum userStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public cpf: CpfValueObject,
    public password: string,
    public status: string = userStatus.ACTIVE,
  ) {
  }
}
const user = new User(
  "1",
  "John Doe",
  "john.doe@example.com",
  new CpfValueObject("123.456.789-00"),
  "1234567890",
  userStatus.ACTIVE,
);


export { } 