import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { authMiddleware } from "../auth/auth.middleware";
import { UserController } from "./user.controller";

// Create user schema for validation
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

interface UserRoutes {
  "/": {
    get: {
      response: {
        data: { id: string; name: string; email: string; role: string };
      };
    };
    post: {
      body: z.infer<typeof createUserSchema>;
      response: {
        data: { id: string; name: string; email: string; role: string };
      };
    };
  };
  "/:id": {
    get: {
      response: {
        data: { id: string; name: string; email: string; role: string };
      };
    };
    put: {
      body: z.infer<typeof createUserSchema>;
      response: {
        data: { id: string; name: string; email: string; role: string };
      };
    };
    delete: {
      response: {
        data: { id: string; name: string; email: string; role: string };
      };
    };
  };
}

const userRouter = new Hono<{ Variables: { userId?: string }; Types: UserRoutes }>();

userRouter
  .use("*", authMiddleware)
  .use("/:id", async (c, next) => {
    const id = c.req.param("id");
    c.set("userId", id);
    await next();
  })
  .get("/", UserController.getUsers)
  .get("/:id", UserController.getUserById)
  .post("/", zValidator("json", createUserSchema), UserController.createUser);

export default userRouter;
