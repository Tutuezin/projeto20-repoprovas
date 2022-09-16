import { notFoundError } from "../middlewares/errorMiddleware";
import { TeacherDiscipline } from "@prisma/client";

export function verifyTeacherDisciplineExists(
  relationTeacherDiscipline: TeacherDiscipline | null
) {
  if (!relationTeacherDiscipline)
    throw notFoundError("teacher in this discipline");
}
