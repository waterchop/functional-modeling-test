import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createPrismaUserRepository } from "../infrastructure/PrismaUserRepository";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../application/user";

const app = express();
app.use(express.json());

const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.DATABASE_URL ||
        "postgresql://postgres:postgres@localhost:5432/app",
    },
  },
});
const repo = createPrismaUserRepository(prisma);

app.post("/users", async (req: Request, res: Response): Promise<void> => {
  const { name, isAdmin, roles, plan } = req.body;
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  const data = isAdmin
    ? { name, isAdmin: true, roles: Array.isArray(roles) ? roles : [] }
    : { name, isAdmin: false, plan: plan ?? "free" };

  const user = await createUser(repo)(data);
  res.status(201).json(user);
});

app.get("/users", async (_req: Request, res: Response): Promise<void> => {
  const users = await listUsers(repo)();
  res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response): Promise<void> => {
  const user = await getUser(repo)(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
});

app.put("/users/:id", async (req: Request, res: Response): Promise<void> => {
  const user = await updateUser(repo)(req.params.id, req.body);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
});

app.delete("/users/:id", async (req: Request, res: Response): Promise<void> => {
  await deleteUser(repo)(req.params.id);
  res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
