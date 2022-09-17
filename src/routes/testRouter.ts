import { Router } from "express";
import { validateSchema } from "../middlewares/validations/schemaValidator";
import { validateToken } from "../middlewares/validations/tokenValidator";
import { createTest } from "../schemas/testSchema";
import * as testController from "../controllers/testController";

const testRouter = Router();

testRouter.post(
  "/test/create",
  validateToken,
  validateSchema(createTest),
  testController.createTest
);
testRouter.get(
  "/test/discipline",
  validateToken,
  testController.getTestByDiscipline
);

testRouter.get("/test/teacher", validateToken, testController.getTestByTeacher);

export default testRouter;
