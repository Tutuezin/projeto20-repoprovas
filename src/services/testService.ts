import * as testTypes from "../types/testTypes";
import * as testRepository from "../repositories/testRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as categoryUtils from "../utils/categoryUtils";
import * as disciplineRepository from "../repositories/disciplineRepository";
import * as disciplineUtils from "../utils/disciplineUtils";
import * as teacherRepository from "../repositories/teacherRepository";
import * as teacherUtils from "../utils/teacherUtils";

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

  return await testRepository.createTest(testData);
}
