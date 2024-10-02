import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";

import baseRouter from "./routes";
import { errorHandler } from "./shared/middleware/error-handler";

const app = new Hono();

// Middleware Setup
app
  .use("*", logger())
  .use("*", cors())
  .use("*", timing())
  .use("*", prettyJSON())
  .use("*", errorHandler);

app.route("/", baseRouter);
const port = 3001;

// eslint-disable-next-line no-console
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
