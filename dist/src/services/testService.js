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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestByTeacher = exports.getTestByDiscipline = exports.createTest = void 0;
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
function createTest(testData) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryExists = yield repositories_1.categoryRepository.getCategoryById(testData.categoryId);
        utils_1.categoryUtils.verifyCategoryExists(categoryExists);
        const disciplineExists = yield repositories_1.disciplineRepository.getDisciplineById(testData.disciplineId);
        utils_1.disciplineUtils.verifyDisciplineExists(disciplineExists);
        const teacherExists = yield repositories_1.teacherRepository.getTeacherById(testData.teacherId);
        utils_1.teacherUtils.verifyTeacherExists(teacherExists);
        const relationTeacherDiscipline = yield repositories_1.teacherDisciplineRepository.getTeacherDiscipline(testData.teacherId, testData.disciplineId);
        utils_1.teacherDisciplineUtils.verifyTeacherDisciplineExists(relationTeacherDiscipline);
        const createTestData = {
            name: testData.name,
            pdfUrl: testData.pdfUrl,
            categoryId: testData.categoryId,
            teacherDisciplineId: relationTeacherDiscipline === null || relationTeacherDiscipline === void 0 ? void 0 : relationTeacherDiscipline.id,
        };
        return yield repositories_1.testRepository.createTest(createTestData);
    });
}
exports.createTest = createTest;
function getTestByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const testByDiscipline = yield repositories_1.testRepository.getTestByDiscipline();
        return testByDiscipline;
    });
}
exports.getTestByDiscipline = getTestByDiscipline;
function getTestByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const testByTeacher = yield repositories_1.testRepository.getTestByTeacher();
        return testByTeacher;
    });
}
exports.getTestByTeacher = getTestByTeacher;
