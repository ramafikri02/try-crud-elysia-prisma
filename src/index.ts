import { Elysia } from "elysia";
// Import routes
import { product } from "./routes/product.routes";
// import { user } from "./routes/user.routes";

const app = new Elysia();
// Routes
app.get("/", () => "Welcome in Elysia ! 🦊\nAdd /api in the url");
("");
app.group("/api", (app) => app.use(product));
// Start server
app.listen(process.env.PORT ?? 8080, () =>
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  )
);
