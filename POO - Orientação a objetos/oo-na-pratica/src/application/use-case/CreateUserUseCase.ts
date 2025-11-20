import { User } from "../../domain/entity/User.js";
import { CreateUserDTO } from "../dtos/CreateUserDTO.js";
import { IUserRepository } from "../../domain/repository/IUserRepository.js";

export class CreateUserUseCase {
  constructor(private readonly repository: IUserRepository) { }

  async execute(dto: CreateUserDTO): Promise<User> {

    const user = new User(dto.id, dto.name, dto.email, dto.password);

    await this.repository.create(user);
    return user;
  }

}