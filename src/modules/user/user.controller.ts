import type { Context } from "hono";

import type { UserCreate } from "./user.types";

import { errorResponse } from "../../utils/error-response";
import { wrapResponse } from "../../utils/wrap-response";
import { UserService } from "./user.service";

export class UserController {
  static async getUsers(c: Context) {
    const users = await UserService.getAll();
    return c.json(wrapResponse(users));
  }

  static async getUserById(c: Context) {
    const id = c.req.param("id");
    const user = await UserService.getById(id);

    if (!user) {
      return c.json(errorResponse("User not found", "not-found"), 404);
    }

    return c.json(wrapResponse(user));
  }

  static async createUser(c: Context) {
    const body = await c.req.json<UserCreate>();

    if (!body.name || !body.email || !body.password || !body.role) {
      return c.json(errorResponse("Invalid request body", "invalid-request"), 400);
    }

    const newUser = await UserService.create(body);
    return c.json(wrapResponse(newUser), 201);
  }
}
