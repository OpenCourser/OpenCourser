"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testValidationSchema = void 0;
const zod_1 = require("zod");
exports.testValidationSchema = zod_1.z
    .object({
    id: zod_1.z.number().min(0).max(100),
    name: zod_1.z.string().min(1).max(16),
})
    .required();
//# sourceMappingURL=test.dto.js.map