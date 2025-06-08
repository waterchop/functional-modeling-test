import { User, UserRepository } from "../domain/user";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async create(data: Omit<User, "id">): Promise<User> {
    const user = { id: randomUUID(), ...data } as User;
    this.users.set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async update(id: string, data: Partial<Omit<User, "id">>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...data } as User;
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}
