"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 8:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(6);
const auth_service_1 = __webpack_require__(9);
const submitUserData_dto_1 = __webpack_require__(26);
const express_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(13);
const tryLogin_dto_1 = __webpack_require__(27);
const loginUser_dto_1 = __webpack_require__(25);
const passport_1 = __webpack_require__(28);
const requestWithUser_1 = __webpack_require__(29);
const responseCreateUser_dto_1 = __webpack_require__(30);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    isValidPassword(submitUserDto) {
        return submitUserDto.password === submitUserDto.passwordConfirm;
    }
    async createUser(submitUserDto) {
        console.log(submitUserDto);
        if (!this.isValidPassword(submitUserDto)) {
            throw new common_1.HttpException("Passwords do not match", 400);
        }
        const { passwordConfirm: _passwordConfirm, ...createUserDto } = submitUserDto;
        return await this.authService.createUser(createUserDto);
    }
    async login(req, res) {
        return await this.authService.login(req.user, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ description: "회원가입", type: submitUserData_dto_1.SubmitUserDataDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: responseCreateUser_dto_1.ResponseCreateUserDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof submitUserData_dto_1.SubmitUserDataDto !== "undefined" && submitUserData_dto_1.SubmitUserDataDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    (0, swagger_1.ApiBody)({ description: "로그인", type: tryLogin_dto_1.TryLoginDto }),
    (0, swagger_1.ApiResponse)({ type: loginUser_dto_1.LoginUserDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof requestWithUser_1.RequestWithUser !== "undefined" && requestWithUser_1.RequestWithUser) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9861d41ff92b80418a30")
/******/ })();
/******/ 
/******/ }
;