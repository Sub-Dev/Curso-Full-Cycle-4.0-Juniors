import { IUserRepository } from "../../domain/repository/IUserRepository.js";
import { User } from "../../domain/entity/User.js";

export class FindByIdUseCase {
  constructor(private readonly repository: IUserRepository) { }

  async execute(id: string): Promise<User | null> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}