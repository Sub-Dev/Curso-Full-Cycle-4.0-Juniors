import { IUserRepository } from "../../domain/repository/IUserRepository.js";
import { User } from "../../domain/entity/User.js";
import { EditUserDTO } from "../dtos/EditUserDTO.js";

export class UpdateUserUseCase {
  constructor(private readonly repository: IUserRepository) { }

  async execute(dtos: EditUserDTO): Promise<boolean> {
    const userRepository = await this.repository.findById(dtos.id);
    if (!userRepository) {
      throw new Error("User not found");
    }
    const user = new User(dtos.id, dtos.name, dtos.email, userRepository.getPassword());
    await this.repository.update(user);
    return true;
  }
}
