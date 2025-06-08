import { Pool } from "pg";
import { User, UserRepository } from "../domain/user";

export class PostgresUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async create(data: Omit<User, "id">): Promise<User> {
    const result = await this.pool.query(
      'INSERT INTO "User" (name, "isAdmin", roles, plan) VALUES ($1, $2, $3, $4) RETURNING id, name, "isAdmin", roles, plan',
      [
        data.name,
        data.isAdmin,
        (data as any).roles ?? null,
        (data as any).plan ?? null,
      ]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT id, name, "isAdmin", roles, plan FROM "User" WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: string, data: Partial<Omit<User, "id">>): Promise<User | null> {
    const result = await this.pool.query(
      'UPDATE "User" SET name = COALESCE($2, name), "isAdmin" = COALESCE($3, "isAdmin"), roles = COALESCE($4, roles), plan = COALESCE($5, plan) WHERE id = $1 RETURNING id, name, "isAdmin", roles, plan',
      [
        id,
        data.name ?? null,
        data.isAdmin ?? null,
        "roles" in data ? (data as any).roles ?? null : null,
        "plan" in data ? (data as any).plan ?? null : null,
      ]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM "User" WHERE id = $1', [id]);
  }

  async findAll(): Promise<User[]> {
    const result = await this.pool.query(
      'SELECT id, name, "isAdmin", roles, plan FROM "User" ORDER BY name'
    );
    return result.rows as User[];
  }
}
