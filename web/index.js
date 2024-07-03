"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage2 = void 0;
function handleMessage2(message, param) {
    var _a;
    var schema = message;
    console.log("", (_a = schema.LinearCmd) === null || _a === void 0 ? void 0 : _a.DeviceIndex);
    return "";
}
exports.handleMessage2 = handleMessage2;
