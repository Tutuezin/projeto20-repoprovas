import * as authTypes from "../types/authTypes";
import * as authUtils from "../utils/authUtils";
import * as cryptoUtils from "../utils/cryptoUtils";
import * as authRepository from "../repositories/authRepository";

export async function signUp(userData: authTypes.IUserData) {
  const emailExists = await authRepository.findEmail(userData.email);

  authUtils.verifyEmailExists(emailExists);

  const hashedPassword = await cryptoUtils.encryptPassword(userData.password);

  await authRepository.createUser({
    email: userData.email,
    password: hashedPassword,
  });
}

export async function signIn(userData: authTypes.IUserData) {
  const emailExists = await authRepository.findEmail(userData.email);

  authUtils.verifyEmailNotExists(emailExists);

  if (emailExists?.password) {
    cryptoUtils.checkPassword(userData.password, emailExists.password);
    const token = authUtils.generateToken(emailExists);
    return token;
  }
}
