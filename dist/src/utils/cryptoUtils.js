"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = void 0;
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
function encryptPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        return hashedPassword;
    });
}
exports.encryptPassword = encryptPassword;
function checkPassword(password, hashedPassword) {
    if (!bcrypt_1.default.compareSync(password, hashedPassword))
        throw (0, errorMiddleware_1.unauthorizedError)("Email or password");
}
exports.checkPassword = checkPassword;
