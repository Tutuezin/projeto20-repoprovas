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
