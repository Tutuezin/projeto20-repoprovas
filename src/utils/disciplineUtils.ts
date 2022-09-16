import { notFoundError } from "../middlewares/errorMiddleware";
import { Discipline } from "@prisma/client";

export function verifyDisciplineExists(disciplineId: Discipline | null) {
  if (!disciplineId) throw notFoundError("discipline");
}
