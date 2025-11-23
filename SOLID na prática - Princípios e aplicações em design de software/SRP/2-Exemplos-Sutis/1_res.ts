// DTO de entrada para cadastro de usuário
interface UserRegistrationDTO {
  name: string;
  email: string;
  password: string; // Senha obrigatória na entrada
}

// DTO de saída para consulta de usuário
interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date; // Apenas informações que fazem sentido na saída
  status: "active" | "inactive"; // Campo que faz sentido apenas na resposta
}

// Serviço de cadastro de usuário
class UserRegistrationService {
  registerUser(user: UserRegistrationDTO) {
    console.log("Usuário registrado:", user);
  }
}

// Serviço de consulta de usuário
class UserQueryService {
  getUserById(id: string): UserResponseDTO {
    return {
      id,
      name: "Alice",
      email: "alice@email.com",
      createdAt: new Date(),
      status: "active", // Novo campo na resposta
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
