import type { Context, Next } from "hono";

import { errorResponse } from "../../utils/error-response";

export async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header("Authorization");

  if (!token || token !== "komtoru") {
    return c.json(errorResponse("Unauthorized!", "no-auth"), 401);
  }

  await next();
}
