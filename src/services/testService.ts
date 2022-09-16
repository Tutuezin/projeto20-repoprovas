import * as testTypes from "../types/testTypes";
import * as testRepository from "../repositories/testRepository";

export async function createTest(testData: testTypes.ITestData) {
  return await testRepository.createTest(testData);
}
