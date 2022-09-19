"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDisciplineExists = void 0;
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
function verifyDisciplineExists(disciplineId) {
    if (!disciplineId)
        throw (0, errorMiddleware_1.notFoundError)("discipline");
}
exports.verifyDisciplineExists = verifyDisciplineExists;
