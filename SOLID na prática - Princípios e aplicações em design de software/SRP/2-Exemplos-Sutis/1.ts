interface UserDTO {
  id?: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
}

// Serviço de cadastro de usuário
class UserRegistrationService {
  registerUser(user: UserDTO) {
    if (!user.password) {
      throw new Error("Senha é obrigatória");
    }
    console.log("Usuário registrado:", user);
  }
}

// Serviço de consulta de usuário
class UserQueryService {
  getUserById(id: string): UserDTO {
    return {
      id,
      name: "Alice",
      email: "alice@email.com",
      createdAt: new Date(),
    };
  }
}

// Uso
const registrationService = new UserRegistrationService();
registrationService.registerUser({
  name: "Alice",
  email: "alice@email.com",
  password: "123456",
});

const queryService = new UserQueryService();
const user = queryService.getUserById("1");
console.log("Usuário consultado:", user);
