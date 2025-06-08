export interface User {
  id: string
  name: string
}

export interface UserRepository {
  create(data: Omit<User, "id">): Promise<User>
  findById(id: string): Promise<User | null>
  update(id: string, data: Partial<Omit<User, "id">>): Promise<User | null>
  delete(id: string): Promise<void>
  findAll(): Promise<User[]>
}

import * as Effect from "effect/Effect"

export const greet = (user: User): Effect.Effect<string, never, never> =>
  Effect.succeed(`Hello ${user.name}`)
