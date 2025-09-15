import { handlers } from "@/auth/auth";

export const { GET, POST } = handlers;

// маршруты на сервер (вроде стандартных REST)
// http://localhost:3000/api/auth/signin
// http://localhost:3000/api/auth/signout
// http://localhost:3000/api/auth/callback
// http://localhost:3000/api/auth/session