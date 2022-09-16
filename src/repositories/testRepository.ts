import { prisma } from "../config/database";
import * as testTypes from "../types/testTypes";

export async function createTest(testData: testTypes.ITestData) {
  //const result = await prisma.test.create({ data: testData });

  console.log(testData);

  /*  console.log(result);
  return result; */
}
