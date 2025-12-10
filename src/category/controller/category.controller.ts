import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { Category } from "../entities/category.entity";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getCategoryById(@Param("id", ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Get("/name/:name")
    @HttpCode(HttpStatus.OK)
    async getCategoryByName(@Param("name") name: string): Promise<Category> {
        return this.categoryService.findByName(name);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCategory(@Body() categoryData: Category): Promise<Category> {
        return this.categoryService.create(categoryData);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateCategory(@Body() categoryData: Category): Promise<Category> {
        return this.categoryService.update(categoryData);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCategory(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.categoryService.delete(id);
    }
}