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
                //distinct: ["teacherDisciplineId"], //? talvez tenha que usar o distinnct
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
                orderBy: [{ categoryId: "asc" }],
              },
            },
          },
        },
      },
    },
  });

  // const result = await prisma.term.findMany({
  //   include: {
  //     discipline: { orderBy: { termId: "asc" } },
  //   },
  // });

  console.log(result[2].discipline[0].teachersDiscipline[0].tests);

  return result;
}
