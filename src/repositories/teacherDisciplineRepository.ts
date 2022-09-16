import { prisma } from "../config/database";

export async function getTeacherDiscipline(
  teacherId: number,
  disciplineId: number
) {
  const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });

  return teacherDiscipline;
}
