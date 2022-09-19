import { prisma } from "./../config/database";
import * as testTypes from "./../types/testTypes";

export async function createTest(testData: testTypes.ITestData) {
  const result = await prisma.test.create({ data: testData });

  return result;
}

export async function getTestByDiscipline() {
  const terms = await prisma.term.findMany({
    select: {
      number: true,
      discipline: {
        select: {
          id: true,
          name: true,
          teachersDiscipline: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      tests: {
        include: {
          teachersDiscipline: {
            select: {
              disciplineId: true,
              teacher: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const testsWithCategory = terms.map((term) => {
    return {
      term: term.number,
      disciplines: term.discipline.map((discipline) => {
        return {
          disciplineName: discipline.name,
          categories: categories
            .map((categorie) => {
              return {
                categoryName: categorie.name,
                tests: categorie.tests
                  .map((test) => {
                    if (test.teachersDiscipline.disciplineId === discipline.id)
                      return {
                        name: test.name,
                        teacherName: test.teachersDiscipline.teacher.name,
                        pdfUrl: test.pdfUrl,
                      };
                  })
                  .filter((testExists) => testExists),
              };
            })
            .filter((categoriesExists) => categoriesExists.tests.length > 0),
        };
      }),
    };
  });

  return testsWithCategory;
}

export async function getTestByTeacher() {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      tests: {
        select: {
          id: true,
          name: true,
          teachersDiscipline: {
            select: {
              teacherId: true,
              discipline: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const testsWithCategory = teachers.map((teacher) => {
    return {
      name: teacher.name,
      categories: categories
        .map((categorie) => {
          return {
            id: categorie.id,
            name: categorie.name,
            tests: categorie.tests
              .map((test) => {
                if (teacher.id === test.teachersDiscipline.teacherId)
                  return {
                    id: test.id,
                    name: test.name,
                    disciplineName: test.teachersDiscipline.discipline.name,
                    disciplineId: test.teachersDiscipline.discipline.id,
                  };
              })
              .filter((testExists) => testExists),
          };
        })
        .filter((categorieExists) => categorieExists.tests.length > 0),
    };
  });

  return testsWithCategory;
}
