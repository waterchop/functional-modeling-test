import { PrismaClient } from "@prisma/client";
import { User, UserRepository } from "../domain/user";

export const createPrismaUserRepository = (
  prisma: PrismaClient,
): UserRepository => ({
  async create(data: Omit<User, "id">): Promise<User> {
    return prisma.user.create({ data });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async update(
    id: string,
    data: Partial<Omit<User, "id">>,
  ): Promise<User | null> {
    try {
      return await prisma.user.update({ where: { id }, data });
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } }).catch(() => {});
  },

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { name: "asc" } });
  },
});
