import { faker } from "@faker-js/faker";

const newUserEmail: string = faker.internet.email();
const newUserPassword: string = faker.internet.password(8);
const randomPassword: string = faker.internet.password();
const incorrectPassword: string = faker.internet.password(5);

export const createUser = {
  email: newUserEmail,
  password: newUserPassword,
  confirmPassword: newUserPassword,
};

export const loginUser = {
  email: newUserEmail,
  password: newUserPassword,
};

export const incorrectLoginUser = {
  email: newUserEmail,
  randomPassword,
};

export const incorrectJoiPassowrd = {
  email: newUserEmail,
  incorrectPassword,
};
