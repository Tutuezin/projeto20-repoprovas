"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./authRouter"));
const testRouter_1 = __importDefault(require("./testRouter"));
const router = (0, express_1.Router)();
router.use(authRouter_1.default);
router.use(testRouter_1.default);
exports.default = router;
