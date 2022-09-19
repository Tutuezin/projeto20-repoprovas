"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const authUtils = __importStar(require("../utils/authUtils"));
const cryptoUtils = __importStar(require("../utils/cryptoUtils"));
const authRepository = __importStar(require("../repositories/authRepository"));
function signUp(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailExists = yield authRepository.findEmail(userData.email);
        authUtils.verifyEmailExists(emailExists);
        const hashedPassword = yield cryptoUtils.encryptPassword(userData.password);
        return yield authRepository.createUser({
            email: userData.email,
            password: hashedPassword,
        });
    });
}
exports.signUp = signUp;
function signIn(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailExists = yield authRepository.findEmail(userData.email);
        authUtils.verifyEmailNotExists(emailExists);
        if (emailExists === null || emailExists === void 0 ? void 0 : emailExists.password) {
            cryptoUtils.checkPassword(userData.password, emailExists.password);
            const token = authUtils.generateToken(emailExists);
            return token;
        }
    });
}
exports.signIn = signIn;
