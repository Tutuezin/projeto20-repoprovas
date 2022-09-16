import { Test } from "@prisma/client";

export type ITestData = Omit<Test, "id">;
