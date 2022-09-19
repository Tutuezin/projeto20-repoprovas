"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTeacherDisciplineExists = void 0;
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
function verifyTeacherDisciplineExists(relationTeacherDiscipline) {
    if (!relationTeacherDiscipline)
        throw (0, errorMiddleware_1.notFoundError)("teacher in this discipline");
}
exports.verifyTeacherDisciplineExists = verifyTeacherDisciplineExists;
