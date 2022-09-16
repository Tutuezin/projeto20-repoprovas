import { Request, Response } from "express";
import * as testTypes from "../types/testTypes";
import * as testService from "../services/testService";

export async function createTest(req: Request, res: Response) {
  const body: testTypes.ITestData = req.body;

  const test = await testService.createTest(body);

  res.status(201).send(test);
}
