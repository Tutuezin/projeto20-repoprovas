"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAcceptableError = exports.badRequestError = exports.unauthorizedError = exports.accessDeniedError = exports.conflictError = exports.notFoundError = exports.missingHeaderError = exports.unprocessableError = void 0;
//422
function unprocessableError(error) {
    return { type: "error_unprocessable_entity", message: error };
}
exports.unprocessableError = unprocessableError;
//401
function missingHeaderError(header) {
    return {
        type: "error_unauthorized",
        message: header,
    };
}
exports.missingHeaderError = missingHeaderError;
//404
function notFoundError(value) {
    return {
        type: "error_not_found",
        message: `Could not find specified ${value}`,
    };
}
exports.notFoundError = notFoundError;
//409
function conflictError(value) {
    return {
        type: "error_conflict",
        message: `${value} already exists`,
    };
}
exports.conflictError = conflictError;
//403
function accessDeniedError(value) {
    return {
        type: "error_access_denied",
        message: `Unable to ${value}`,
    };
}
exports.accessDeniedError = accessDeniedError;
//401
function unauthorizedError(value) {
    return {
        type: "error_unauthorized",
        message: `${value} is invalid`,
    };
}
exports.unauthorizedError = unauthorizedError;
//400
function badRequestError(value) {
    return {
        type: "error_bad_request",
        message: `${value}`,
    };
}
exports.badRequestError = badRequestError;
//406
function notAcceptableError(value) {
    return {
        type: "error_not_acceptable",
        message: `${value}`,
    };
}
exports.notAcceptableError = notAcceptableError;
const errorHandler = (err, req, res, next) => {
    if (err.type === "error_unprocessable_entity") {
        return res.status(422).send(err.message);
    }
    if (err.type === "error_unauthorized") {
        return res.status(401).send(err.message);
    }
    if (err.type === "error_not_found") {
        return res.status(404).send(err.message);
    }
    if (err.type === "error_conflict") {
        return res.status(409).send(err.message);
    }
    if (err.type === "error_access_denied") {
        return res.status(403).send(err.message);
    }
    if (err.type === "error_unauthorized") {
        return res.status(401).send(err.message);
    }
    if (err.type === "error_bad_request") {
        return res.status(400).send(err.message);
    }
    if (err.type === "error_not_acceptable") {
        return res.status(406).send(err.message);
    }
    return res.status(500).send(err.message);
};
exports.default = errorHandler;
