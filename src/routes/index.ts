import { Hono } from "hono";

import userRouter from "../modules/user/user.routes";

const API_VERSION = "v1";

const baseRouter = new Hono();

// Health check
baseRouter.get("/health", (c) => {
  return c.json({
    message: "OK",
  });
});

const api = new Hono()
  .route("/users", userRouter);

// API Version Prefix
baseRouter.route(`/${API_VERSION}`, api);
export default baseRouter;
