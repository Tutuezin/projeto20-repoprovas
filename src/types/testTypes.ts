import { Test } from "@prisma/client";

export type ITestData = Omit<Test, "id">;

export interface ITest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherId: number;
  disciplineId: number;
}
