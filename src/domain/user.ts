export interface User {
  id: string
  name: string
}

import * as Effect from "effect/Effect"

export const greet = (user: User): Effect.Effect<string, never, never> =>
  Effect.succeed(`Hello ${user.name}`)
