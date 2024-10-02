import type { Context, Next } from "hono";

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  }
  catch (error) {
    if (error instanceof Error) {
      return c.json({ error:
            { code: 500, message: error.message,

            } }, 500);
    }

    return c.json({ error: "Internal Server Error" }, 500);
  }
}
