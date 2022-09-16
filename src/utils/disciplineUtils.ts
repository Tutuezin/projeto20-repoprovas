import { notFoundError } from "../middlewares/errorMiddleware";
import { Discipline } from "@prisma/client";

export function verifyDisciplineExists(disciplineId: Discipline | null) {
  console.log(disciplineId);

  if (!disciplineId) throw notFoundError("discipline");
}
