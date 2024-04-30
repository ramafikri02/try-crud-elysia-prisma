import { Elysia, t } from "elysia";
import prisma from "../utils/prisma";

export const productController = new Elysia()
  //! =========== GET DATA =============
  .get("/", async ({ set }) => {
    try {
      const product = await prisma.product.findMany({});
      set.status = 200;
      return {
        message: "Success get data product",
        data: product,
      };
    } catch (e: unknown) {
      set.status = 500;
      return {
        message: "Unable to retrieve items from the database!",
        status: 500,
        data: [],
      };
    }
  })
  //! =========== GET DATA BY ID =============
  .get("/:id", async ({ set, params }) => {
    try {
      const { id } = params;

      const product = await prisma.product.findFirst({
        where: {
          product_code: id,
        },
      });

      if (!product) {
        set.status = 404;
        return {
          message: "No data found!",
          data: product,
        };
      }

      set.status = 200;
      return {
        message: "Success get data product",
        data: product,
      };
    } catch (error) {
      set.status = 500;
      return error;
    }
  })
  //! =========== CREATE DATA =============
  .guard(
    {
      body: t.Object({
        product_name: t.String(),
        price: t.Integer(),
        description: t.MaybeEmpty(t.String()),
        createdBy: t.String(),
      }),
    },
    (app) =>
      app.post("/", async ({ body, set }) => {
        try {
          const savedproduct = await prisma.product.create({ data: body });

          set.status = 201;
          return {
            message: "Success create data product",
            data: savedproduct,
          };
        } catch (error: any) {
          // If unique mongoose constraint (for username or email) is violated
          if (error.code === "P2002") {
            set.status = 422;
            return {
              message: "Data already exists!",
              status: 422,
            };
          }

          set.status = 500;
          return {
            message: "Unable to save data to the database!",
            status: 500,
          };
        }
      })
  )
  //! =========== DELETE DATA BY ID =============
  .delete("/:id", async ({ set, params }) => {
    try {
      const { id } = params;
      await prisma.product.delete({ where: { product_code: id } });
      set.status = 200;
      return {
        message: `Product deleted successfully!`,
        status: 200,
      };
    } catch (e: any) {
      set.status = 500;
      return {
        message: "Unable to delete data!",
        status: 500,
      };
    }
  })
  //? PATCH = Partially update an existing resource (not all attributes required).
  //? PUT = Set all new attributes for an existing resource.
  //! =========== UPDATE DATA BY ID (patch) =============
  .guard(
    {
      body: t.Object({
        product_name: t.Optional(t.String()),
        price: t.Optional(t.Integer()),
        description: t.Optional(t.String()),
      }),
    },
    (app) =>
      app.patch("/update/:id", async ({ set, params, body }) => {
        try {
          const { id } = params;

          await prisma.product.update({
            where: { product_code: id },
            data: body,
          });
          set.status = 200;
          return {
            message: "Product are successfully updated",
            status: 200,
          };
        } catch (e: any) {
          set.status = 500;
          return {
            message: "Unable to update data!",
            status: 500,
          };
        }
      })
  )
  //! =========== UPDATE DATA BY ID (put) =============
  .guard(
    {
      body: t.Object({
        product_name: t.Optional(t.String()),
        price: t.Optional(t.Integer()),
        description: t.Optional(t.String()),
      }),
    },
    (app) =>
      app.put("/change/:id", async ({ set, params, body }) => {
        try {
          const { id } = params;
          console.log(body);

          await prisma.product.update({
            where: { product_code: id },
            data: body,
          });
          set.status = 200;
          return {
            message: "Product are successfully updated",
            status: 200,
          };
        } catch (e: any) {
          set.status = 500;
          return {
            message: "Unable to update data!",
            status: 500,
          };
        }
      })
  );
