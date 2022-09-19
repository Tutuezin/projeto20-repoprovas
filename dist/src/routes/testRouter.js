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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemaValidator_1 = require("../middlewares/validations/schemaValidator");
const tokenValidator_1 = require("../middlewares/validations/tokenValidator");
const testSchema_1 = require("../schemas/testSchema");
const testController = __importStar(require("../controllers/testController"));
const testRouter = (0, express_1.Router)();
testRouter.post("/test/create", tokenValidator_1.validateToken, (0, schemaValidator_1.validateSchema)(testSchema_1.createTest), testController.createTest);
testRouter.get("/test/discipline", tokenValidator_1.validateToken, testController.getTestByDiscipline);
testRouter.get("/test/teacher", tokenValidator_1.validateToken, testController.getTestByTeacher);
exports.default = testRouter;
