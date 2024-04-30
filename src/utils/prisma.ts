import { PrismaClient } from "@prisma/client";
// import { createSoftDeleteMiddleware } from "prisma-soft-delete-middleware";

const prisma = new PrismaClient({
  errorFormat: "minimal",
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

export default prisma;
