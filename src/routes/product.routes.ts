import { createElysia } from "../utils/createElysia";
import { productController } from "../controller/product.controller";

export const product = createElysia().group("/product", (app) =>
  app.use(productController)
);
