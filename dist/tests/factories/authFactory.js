"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incorrectJoiPassowrd = exports.incorrectLoginUser = exports.loginUser = exports.createUser = void 0;
const faker_1 = require("@faker-js/faker");
const newUserEmail = faker_1.faker.internet.email();
const newUserPassword = faker_1.faker.internet.password(8);
const randomPassword = faker_1.faker.internet.password();
const incorrectPassword = faker_1.faker.internet.password(5);
exports.createUser = {
    email: newUserEmail,
    password: newUserPassword,
    confirmPassword: newUserPassword,
};
exports.loginUser = {
    email: newUserEmail,
    password: newUserPassword,
};
exports.incorrectLoginUser = {
    email: newUserEmail,
    randomPassword,
};
exports.incorrectJoiPassowrd = {
    email: newUserEmail,
    incorrectPassword,
};
