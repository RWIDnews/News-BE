"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const common_1 = require("@nestjs/common");
const bookmark_service_1 = require("./bookmark.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let BookmarkController = class BookmarkController {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    async createBookmark(newsId, req) {
        const userId = req.user.id;
        console.log('--==-', userId);
        return this.bookmarkService.createBookmark(userId, newsId);
    }
    async removeBookmark(newsId, req) {
        const userId = req.user.id;
        await this.bookmarkService.removeBookmark(userId, newsId);
    }
    async getUserBookmarks(req) {
        const userId = req.user.id;
        return this.bookmarkService.getUserBookmarks(userId);
    }
};
exports.BookmarkController = BookmarkController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(':newsId'),
    __param(0, (0, common_1.Param)('newsId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "createBookmark", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':newsId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bookmark removed' }),
    __param(0, (0, common_1.Param)('newsId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "removeBookmark", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookmarkController.prototype, "getUserBookmarks", null);
exports.BookmarkController = BookmarkController = __decorate([
    (0, swagger_1.ApiTags)('bookmarks'),
    (0, common_1.Controller)('bookmarks'),
    __metadata("design:paramtypes", [bookmark_service_1.BookmarkService])
], BookmarkController);
//# sourceMappingURL=bookmark.controller.js.map