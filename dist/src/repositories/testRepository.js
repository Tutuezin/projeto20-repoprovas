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
const database_1 = require("../config/database");
function createTest(testData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.test.create({ data: testData });
        return result;
    });
}
exports.createTest = createTest;
function getTestByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const terms = yield database_1.prisma.term.findMany({
            select: {
                number: true,
                discipline: {
                    select: {
                        id: true,
                        name: true,
                        teachersDiscipline: true,
                    },
                },
            },
        });
        const categories = yield database_1.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                tests: {
                    include: {
                        teachersDiscipline: {
                            select: {
                                disciplineId: true,
                                teacher: {
                                    select: {
                                        name: true,
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const testsWithCategory = terms.map((term) => {
            return {
                term: term.number,
                disciplines: term.discipline.map((discipline) => {
                    return {
                        disciplineName: discipline.name,
                        categories: categories
                            .map((categorie) => {
                            return {
                                categoryName: categorie.name,
                                tests: categorie.tests
                                    .map((test) => {
                                    if (test.teachersDiscipline.disciplineId === discipline.id)
                                        return {
                                            name: test.name,
                                            teacherName: test.teachersDiscipline.teacher.name,
                                            pdfUrl: test.pdfUrl,
                                        };
                                })
                                    .filter((testExists) => testExists),
                            };
                        })
                            .filter((categoriesExists) => categoriesExists.tests.length > 0),
                    };
                }),
            };
        });
        return testsWithCategory;
    });
}
exports.getTestByDiscipline = getTestByDiscipline;
function getTestByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const teachers = yield database_1.prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        const categories = yield database_1.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                tests: {
                    select: {
                        id: true,
                        name: true,
                        teachersDiscipline: {
                            select: {
                                teacherId: true,
                                discipline: {
                                    select: {
                                        name: true,
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const testsWithCategory = teachers.map((teacher) => {
            return {
                name: teacher.name,
                categories: categories
                    .map((categorie) => {
                    return {
                        id: categorie.id,
                        name: categorie.name,
                        tests: categorie.tests
                            .map((test) => {
                            if (teacher.id === test.teachersDiscipline.teacherId)
                                return {
                                    id: test.id,
                                    name: test.name,
                                    disciplineName: test.teachersDiscipline.discipline.name,
                                    disciplineId: test.teachersDiscipline.discipline.id,
                                };
                        })
                            .filter((testExists) => testExists),
                    };
                })
                    .filter((categorieExists) => categorieExists.tests.length > 0),
            };
        });
        return testsWithCategory;
    });
}
exports.getTestByTeacher = getTestByTeacher;
