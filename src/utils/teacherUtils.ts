import { notFoundError } from "../middlewares/errorMiddleware";
import { Teacher } from "@prisma/client";

export function verifyTeacherExists(teacherId: Teacher | null) {
  if (!teacherId) throw notFoundError("teacher");
}
