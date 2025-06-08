export type Subscription = "paid" | "free"

export type Role = "edit" | "view" | "full"

export interface BaseUser {
  id: string
  name: string
  isAdmin: boolean
}

export interface AdminUser extends BaseUser {
  isAdmin: true
  roles: Role[]
}

export interface RegularUser extends BaseUser {
  isAdmin: false
  plan: Subscription
}

export type User = AdminUser | RegularUser

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
