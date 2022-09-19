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
exports.teacherDisciplineRepository = exports.teacherRepository = exports.disciplineRepository = exports.categoryRepository = exports.testRepository = void 0;
const testRepository = __importStar(require("./testRepository"));
exports.testRepository = testRepository;
const categoryRepository = __importStar(require("./categoryRepository"));
exports.categoryRepository = categoryRepository;
const disciplineRepository = __importStar(require("./disciplineRepository"));
exports.disciplineRepository = disciplineRepository;
const teacherRepository = __importStar(require("./teacherRepository"));
exports.teacherRepository = teacherRepository;
const teacherDisciplineRepository = __importStar(require("./teacherDisciplineRepository"));
exports.teacherDisciplineRepository = teacherDisciplineRepository;
