"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const errorMiddleware_1 = require("../errorMiddleware");
function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const messageError = error.details.map((err) => err.message);
            throw (0, errorMiddleware_1.unprocessableError)(messageError);
        }
        next();
    };
}
exports.validateSchema = validateSchema;
