import { greet, User } from "./domain/user"
import * as Effect from "effect/Effect"

const user: User = { id: "1", name: "Alice" }

Effect.runPromise(greet(user)).then(console.log)
