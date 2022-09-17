import * as testTypes from "../types/testTypes";
import {
  testRepository,
  categoryRepository,
  disciplineRepository,
  teacherRepository,
  teacherDisciplineRepository,
} from "../repositories";
import {
  categoryUtils,
  disciplineUtils,
  teacherUtils,
  teacherDisciplineUtils,
} from "../utils";
import { info } from "console";

export async function createTest(testData: testTypes.ITest) {
  const categoryExists = await categoryRepository.getCategoryById(
    testData.categoryId
  );
  categoryUtils.verifyCategoryExists(categoryExists);

  const disciplineExists = await disciplineRepository.getDisciplineById(
    testData.disciplineId
  );
  disciplineUtils.verifyDisciplineExists(disciplineExists);

  const teacherExists = await teacherRepository.getTeacherById(
    testData.teacherId
  );
  teacherUtils.verifyTeacherExists(teacherExists);

  const relationTeacherDiscipline =
    await teacherDisciplineRepository.getTeacherDiscipline(
      testData.teacherId,
      testData.disciplineId
    );

  teacherDisciplineUtils.verifyTeacherDisciplineExists(
    relationTeacherDiscipline
  );

  const createTestData: testTypes.ITestData = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
    teacherDisciplineId: relationTeacherDiscipline?.id!,
  };

  return await testRepository.createTest(createTestData);
}

export async function getTestByDiscipline() {
  return await testRepository.getTestByDiscipline(); //TODO fazer build do objeto
}

export async function getTestByTeacher() {
  const testByTeacher = await testRepository.getTestByTeacher();

  const buildTestByTeacher = testByTeacher.map((item) => {
    return {
      teacherName: item.name,
      infos: item.teachersDiscipline[0].tests.map((infos) => {
        return {
          categoryId: infos.category.id,
          categoryName: infos.category.name,

          infoTests: infos.category.tests
            .map((infoTests) => {
              const tests = {
                testName: infoTests.name,
                disciplineName: infoTests.teachersDiscipline.discipline.name,
                teacherName: infoTests.teachersDiscipline.teacher.name,
              };

              if (infoTests.teachersDiscipline.teacher.name === item.name)
                return tests;
            })
            .filter((notNull) => notNull),
        };
      }),
    };
  });

  return buildTestByTeacher;
}
