import { prisma } from "../config/database";
import * as testTypes from "../types/testTypes";

export async function createTest(testData: testTypes.ITestData) {
  const result = await prisma.test.create({ data: testData });

  return result;
}

export async function getTestByDiscipline() {
  const result = await prisma.term.findMany({
    select: {
      number: true,
      discipline: {
        orderBy: [{ termId: "asc" }],
        include: {
          teachersDiscipline: {
            select: {
              tests: {
                distinct: ["categoryId"],
                select: {
                  category: {
                    select: {
                      id: true,
                      name: true,
                      tests: {
                        select: {
                          name: true,
                          pdfUrl: true,
                          teachersDiscipline: {
                            select: {
                              teacher: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                orderBy: [{ category: { name: "asc" } }],
              },
            },
          },
        },
      },
    },
  });

  return result;
}

export async function getTestByTeacher() {
  const result = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      teachersDiscipline: {
        distinct: ["teacherId"],
        select: {
          tests: {
            distinct: ["categoryId"],
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  tests: {
                    select: {
                      id: true,
                      name: true,
                      pdfUrl: true,
                      teachersDiscipline: {
                        select: {
                          teacher: true,
                          discipline: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            orderBy: [{ category: { name: "asc" } }],
          },
        },
      },
    },
  });

  return result;
}
