import { Pool } from "pg";
import { User, UserRepository } from "../domain/user";

export class PostgresUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async create(data: Omit<User, "id">): Promise<User> {
    const result = await this.pool.query(
      'INSERT INTO "User" (name) VALUES ($1) RETURNING id, name',
      [data.name]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT id, name FROM "User" WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: string, data: Partial<Omit<User, "id">>): Promise<User | null> {
    const result = await this.pool.query(
      'UPDATE "User" SET name = COALESCE($2, name) WHERE id = $1 RETURNING id, name',
      [id, data.name ?? null]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM "User" WHERE id = $1', [id]);
  }

  async findAll(): Promise<User[]> {
    const result = await this.pool.query(
      'SELECT id, name FROM "User" ORDER BY name'
    );
    return result.rows as User[];
  }
}
