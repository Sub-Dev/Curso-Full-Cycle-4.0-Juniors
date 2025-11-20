import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { GetAllUserUseCase } from "../../application/use-case/GetAllUserUseCase.js";
import { CreateUserUseCase } from "../../application/use-case/CreateUserUseCase.js";
import { FindByIdUseCase } from "../../application/use-case/FindByIdUseCase.js";
import { UpdateUserUseCase } from "../../application/use-case/UpdateUserUseCase.js";
import { DeleteUserUseCase } from "../../application/use-case/DeleteUserUseCase.js";
import { UserRepositoryInMemory } from "../repository/UserRepositoryInMemory.js";

export function createUserRouter() {
  const router = Router();

  // Instanciar o repositório
  const repository = new UserRepositoryInMemory();

  // Instanciar os use cases
  const getAllUserUseCase = new GetAllUserUseCase(repository);
  const createUserUseCase = new CreateUserUseCase(repository);
  const findByIdUseCase = new FindByIdUseCase(repository);
  const updateUserUseCase = new UpdateUserUseCase(repository);
  const deleteUserUseCase = new DeleteUserUseCase(repository);

  // Instanciar o controller
  const userController = new UserController(
    getAllUserUseCase,
    createUserUseCase,
    findByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase
  );

  // Definir as rotas
  router.get("/", (req, res) => userController.getAllUsers(req, res));
  router.post("/", (req, res) => userController.createUser(req, res));
  router.get("/:id", (req, res) => userController.getUserById(req, res));
  router.put("/:id", (req, res) => userController.updateUser(req, res));
  router.delete("/:id", (req, res) => userController.deleteUser(req, res));

  return router;
}