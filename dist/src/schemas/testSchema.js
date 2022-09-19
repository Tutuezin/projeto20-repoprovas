"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTest = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTest = joi_1.default.object({
    name: joi_1.default.string().max(50).required(),
    pdfUrl: joi_1.default.string().uri().required(),
    categoryId: joi_1.default.number().strict().required(),
    disciplineId: joi_1.default.number().strict().required(),
    teacherId: joi_1.default.number().strict().required(),
});
