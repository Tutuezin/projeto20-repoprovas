import { Router } from "express";
import { validateSchema } from "../middlewares/validations/schemaValidator";
import { validateToken } from "../middlewares/validations/tokenValidator";
import { createTest } from "../schemas/testSchema";
import * as testController from "../controllers/testController";

const testRouter = Router();

testRouter.post(
  "/test/create",
  validateSchema(createTest),
  testController.createTest
);
testRouter.post("/signin");

export default testRouter;
