import type { IUserRepository } from "../../domain/repository/IUserRepository.js";
import { User } from "../../domain/entity/User.js";


export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.getId() === user.getId());
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async delete(id: string): Promise<boolean> {
    this.users = this.users.filter((user) => user.getId() !== id);
    return true;
  }
}