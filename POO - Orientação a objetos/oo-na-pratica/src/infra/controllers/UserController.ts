import { GetAllUserUseCase } from "../../application/use-case/GetAllUserUseCase.js";
import type { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-case/CreateUserUseCase.js";
import { UpdateUserUseCase } from "../../application/use-case/UpdateUserUseCase.js";
import { DeleteUserUseCase } from "../../application/use-case/DeleteUserUseCase.js";
import { FindByIdUseCase } from "../../application/use-case/FindByIdUseCase.js";

export class UserController {
  constructor(
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) { }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUserUseCase.execute();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Bad request" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }
      const user = await this.findByIdUseCase.execute(id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error instanceof Error ? error.message : "User not found" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.updateUserUseCase.execute(req.body);
      res.json({ success: result });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Bad request" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }
      const result = await this.deleteUserUseCase.execute(id);
      res.json({ success: result });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
