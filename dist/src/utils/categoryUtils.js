"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCategoryExists = void 0;
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
function verifyCategoryExists(categoryId) {
    if (!categoryId)
        throw (0, errorMiddleware_1.notFoundError)("category");
}
exports.verifyCategoryExists = verifyCategoryExists;
