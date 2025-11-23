import "reflect-metadata";
import { Container, injectable, inject } from "inversify";

// Definição da interface Database
interface Database {
  save(data: string): void;
}

// Implementação da interface
@injectable()
class MySQLDatabase implements Database {
  save(data: string) {
    console.log(`Salvando ${data} no MySQL`);
  }
}

// Serviço que usa o banco de dados
@injectable()
class UserService {
  constructor(@inject("Database") private database: Database) {}

  createUser(name: string) {
    this.database.save(name);
  }
}

interface UserServiceInterface {
  createUser(name: string): void;
}

class CheckoutService {
  constructor(
    @inject("UserService") private userService: UserServiceInterface
  ) {}

  checkout() {
    // createUser = this.userService.createUser("João");
    // console.log("Checkout realizado com sucesso - " + createUser);
  }
}

// Passo 4: Configurando o container de InversifyJS
const container = new Container();
container.bind<Database>("Database").to(MySQLDatabase);
container.bind<UserService>("UserService").to(UserService);
container.bind<CheckoutService>(CheckoutService).toSelf();

// Passo 5: Resolvendo dependências e usando o serviço
const checkoutService = container.get(CheckoutService); //
checkoutService.checkout(); // Checkout realizado com sucesso

const c = new CheckoutService(new UserService(new MySQLDatabase()));
