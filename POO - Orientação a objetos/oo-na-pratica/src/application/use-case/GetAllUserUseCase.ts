import { IUserRepository } from "../../domain/repository/IUserRepository.js";
import { User } from "../../domain/entity/User.js";

export class GetAllUserUseCase {
  constructor(private readonly repository: IUserRepository) { }

  async execute(): Promise<User[]> {
    return this.repository.findAll();
  }
}