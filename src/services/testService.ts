import * as testTypes from "../types/testTypes";
import * as testRepository from "../repositories/testRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as categoryUtils from "../utils/categoryUtils";
import * as disciplineRepository from "../repositories/disciplineRepository";

export async function createTest(testData: testTypes.ITest) {
  console.log(testData);

  const categoryExists = await categoryRepository.getCategoryById(
    testData.categoryId
  );
  categoryUtils.verifyCategoryExists(categoryExists);

  const disciplineExists = await disciplineRepository.getDisciplineById(
    testData.disciplineId
  );

  return await testRepository.createTest(testData);
}
