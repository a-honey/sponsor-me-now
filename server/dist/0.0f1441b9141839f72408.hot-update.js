"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 68:
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentController = void 0;
const swagger_1 = __webpack_require__(13);
const common_1 = __webpack_require__(6);
const comment_service_1 = __webpack_require__(69);
const passport_1 = __webpack_require__(28);
const requestWithUser_1 = __webpack_require__(29);
const createComment_dto_1 = __webpack_require__(71);
const comment_dto_1 = __webpack_require__(70);
const optionalIntPipe_1 = __webpack_require__(72);
const responseComment_dto_1 = __webpack_require__(73);
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async createComment(req, createCommentDto, postId, parentId) {
        const userId = Number(req.user.id);
        return await this.commentService.createComment(userId, postId, parentId, createCommentDto);
    }
    async updateComment(req, updateCommentDto, commentId) {
        const userId = Number(req.user.id);
        return await this.commentService.updateComment(userId, commentId, updateCommentDto);
    }
    async deleteComment(req, commentId) {
        const userId = Number(req.user.id);
        return await this.commentService.deleteComment(userId, commentId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ description: "댓글 작성 또는 대댓글 작성", type: createComment_dto_1.CreateCommentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: responseComment_dto_1.ResponseCommentDto }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)("postId", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Optional)()),
    __param(3, (0, common_1.Query)("parentId", optionalIntPipe_1.OptionalIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof requestWithUser_1.RequestWithUser !== "undefined" && requestWithUser_1.RequestWithUser) === "function" ? _b : Object, typeof (_c = typeof createComment_dto_1.CreateCommentDto !== "undefined" && createComment_dto_1.CreateCommentDto) === "function" ? _c : Object, Number, Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Put)(":commentId"),
    (0, swagger_1.ApiBody)({ description: "댓글 수정", type: createComment_dto_1.CreateCommentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: responseComment_dto_1.ResponseCommentDto }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("commentId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof requestWithUser_1.RequestWithUser !== "undefined" && requestWithUser_1.RequestWithUser) === "function" ? _e : Object, typeof (_f = typeof createComment_dto_1.CreateCommentDto !== "undefined" && createComment_dto_1.CreateCommentDto) === "function" ? _f : Object, Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)(":commentId"),
    (0, swagger_1.ApiBody)({ description: "댓글 + 자식 댓글 삭제" }),
    (0, swagger_1.ApiResponse)({ status: 204, type: comment_dto_1.CommentDto }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("commentId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof requestWithUser_1.RequestWithUser !== "undefined" && requestWithUser_1.RequestWithUser) === "function" ? _h : Object, Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CommentController.prototype, "deleteComment", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)("Comment"),
    (0, common_1.Controller)("api/comment"),
    __metadata("design:paramtypes", [typeof (_a = typeof comment_service_1.CommentService !== "undefined" && comment_service_1.CommentService) === "function" ? _a : Object])
], CommentController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8ff0a7b1ff5a73c2f8be")
/******/ })();
/******/ 
/******/ }
;