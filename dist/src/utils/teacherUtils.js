"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTeacherExists = void 0;
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
function verifyTeacherExists(teacherId) {
    if (!teacherId)
        throw (0, errorMiddleware_1.notFoundError)("teacher");
}
exports.verifyTeacherExists = verifyTeacherExists;
