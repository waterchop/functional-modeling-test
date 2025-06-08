import { greet, User } from "./domain/user"
import * as Effect from "effect/Effect"

const user: User = { id: "1", name: "Alice", isAdmin: false, plan: "free" }

Effect.runPromise(greet(user)).then(console.log)
