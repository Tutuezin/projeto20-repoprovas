import { prisma } from "../config/database";
import * as authTypes from "../types/authTypes";

export async function findEmail(email: string) {
  const result = await prisma.user.findUnique({ where: { email } });

  return result;
}

export async function createUser(user: authTypes.IUserData) {
  await prisma.user.create({ data: user });
}
