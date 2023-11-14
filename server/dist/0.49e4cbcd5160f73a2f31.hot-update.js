"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 5:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const core_1 = __webpack_require__(4);
const auth_module_1 = __webpack_require__(7);
const user_module_1 = __webpack_require__(33);
const upload_module_1 = __webpack_require__(45);
const post_module_1 = __webpack_require__(56);
const like_module_1 = __webpack_require__(63);
const comment_module_1 = __webpack_require__(67);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: "api",
                    children: [
                        {
                            path: "auth",
                            module: auth_module_1.AuthModule,
                        },
                        {
                            path: "user",
                            module: user_module_1.UserModule,
                        },
                        {
                            path: "upload",
                            module: upload_module_1.UploadModule,
                        },
                        {
                            path: "post",
                            module: post_module_1.PostModule,
                        },
                        {
                            path: "like",
                            module: like_module_1.LikeModule,
                        },
                        {
                            path: "comment",
                            module: comment_module_1.CommentModule,
                        },
                    ],
                },
            ]),
        ],
    })
], AppModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("91087c04a23e444d8e22")
/******/ })();
/******/ 
/******/ }
;