import { notFoundError } from "../middlewares/errorMiddleware";
import { Category } from "@prisma/client";

export function verifyCategoryExists(categoryId: Category | null) {
  if (!categoryId) throw notFoundError("category");
}
