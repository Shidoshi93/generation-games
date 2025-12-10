import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { DeleteResult, ILike, In, Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        Logger.log("Fetching all categories from the database.");
        let categories: Category[] = [];
        try {
            categories = await this.categoryRepository.find();
            
        } catch (error) {
            Logger.error("Error fetching categories:", error);
            throw new InternalServerErrorException("Could not fetch categories");
        }

        if (categories.length === 0) {
                Logger.warn("No categories found in the database.");
        }
        
        Logger.log(`Successfully fetched ${categories.length} categories.`);
        return categories;
    }

    async findById(id: number): Promise<Category> {
        Logger.log(`Fetching category with ID: ${id} from the database.`);
        let category: Category | null = null;

        try {
            category = await this.categoryRepository.findOneBy({ id });

            if (!category) {
                Logger.warn(`Category with ID: ${id} not found.`);
                throw new NotFoundException(`Category with ID: ${id} not found.`);
            }
        } catch (error) {
            Logger.error(`Error fetching category with ID: ${id}`, error);
            throw new InternalServerErrorException("Could not fetch category");
        }

        Logger.log(`Category with ID: ${id} successfully fetched.`);
        return category;
    }

    async findByName(name: string): Promise<Category> {
        Logger.log(`Fetching category with name: ${name} from the database.`);
        let category: Category | null = null;

        try {
            category = await this.categoryRepository.findOneBy({ 
                name: ILike(`%${name}%`)
            });

            if (!category) {
                Logger.warn(`Category with name: ${name} not found.`);
                throw new NotFoundException(`Category with name: ${name} not found.`);
            }
        } catch (error) {
            Logger.error(`Error fetching category with name: ${name}`, error);
            throw new InternalServerErrorException("Could not fetch category");
        }

        Logger.log(`Category with name: ${name} successfully fetched.`);
        return category;
    }

    async create(categoryData: Category): Promise<Category> {
        Logger.log("Creating a new category.");

        try {
            const existingCategory = await this.categoryRepository.findOneBy({ name: categoryData.name });

            if (existingCategory) {
                Logger.warn(`Category with name: ${categoryData.name} already exists.`);
                throw new NotFoundException(`Category with name: ${categoryData.name} already exists.`);
            }

            Logger.log(`Category with name: ${categoryData.name} does not exist. Proceeding to create.`);

            return await this.categoryRepository.save(categoryData);
        } catch (error) {
            Logger.error("Error creating a new category:", error);
            throw new InternalServerErrorException("Could not create category");
        }
    }

    async update(updateData: Partial<Category>): Promise<Category> {
        Logger.log(`Updating category with ID: ${updateData.id}.`);

        try {
            await this.categoryRepository.findOneByOrFail({ id: updateData.id });
            const updatedCategory = await this.categoryRepository.save(updateData);
            Logger.log(`Category with ID: ${updateData.id} successfully updated.`);
            return updatedCategory;
        } catch (error) {
            Logger.error(`Error updating category with ID: ${updateData.id}`, error);
            throw new InternalServerErrorException("Could not update category");
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        Logger.log(`Deleting category with ID: ${id}.`);

        try {
            const result = await this.categoryRepository.delete(id);
            Logger.log(`Category with ID: ${id} successfully deleted.`);
            return result;
        } catch (error) {
            Logger.error(`Error deleting category with ID: ${id}`, error);
            throw new InternalServerErrorException("Could not delete category");
        }
    }
}
