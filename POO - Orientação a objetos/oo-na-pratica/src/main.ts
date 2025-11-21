import express from "express";
import { createUserRouter } from "./infra/routes/userRoutes.js";
const app = express();
app.use(express.json());

app.use("/api/v1/users", createUserRouter());


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});