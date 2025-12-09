import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "../entities/game.entity";
import { Repository } from "typeorm";
import { CategoryService } from "../../category/service/category.service";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly categoryService: CategoryService
  ) {}

    async findGamesByCategoryName(categoryName: string): Promise<Game[]> {
        Logger.log(`Fetching games for category: ${categoryName}`);
        let category;
        try {
            category = await this.categoryService.findByName(categoryName);
            const games = await this.gameRepository.find({
                where: { category: { id: category.id } },
                relations: { category: true },
            });
            Logger.log(`Found ${games.length} games for category: ${categoryName}`);
            return games;
        } catch (error) {
            Logger.error(`Error fetching games for category: ${categoryName}`, error);
            throw new InternalServerErrorException("Could not fetch games");
        }
    }

    async findAll(): Promise<Game[]> {
        Logger.log("Fetching all games from the database.");
        let games: Game[] = [];
        try {
            games = await this.gameRepository.find({ relations: { category: true } });
        } catch (error) {
            Logger.error("Error fetching games:", error);
            throw new InternalServerErrorException("Could not fetch games");
        }

        if (games.length === 0) {
            Logger.warn("No games found in the database.");
        }

        Logger.log(`Successfully fetched ${games.length} games.`);
        return games;
    }

    async findById(id: number): Promise<Game> {
        Logger.log(`Fetching game with ID: ${id} from the database.`);
        let game: Game | null = null;

        try {
            game = await this.gameRepository.findOne({
                where: { id },
                relations: { category: true },
            });

            if (!game) {
                Logger.warn(`Game with ID: ${id} not found.`);
                throw new InternalServerErrorException(`Game with ID: ${id} not found.`);
            }
        } catch (error) {
            Logger.error(`Error fetching game with ID: ${id}`, error);
            throw new InternalServerErrorException("Could not fetch game");
        }

        Logger.log(`Game with ID: ${id} successfully fetched.`);
        return game;
    }

    async create(gameData: Partial<Game>): Promise<Game> {
        Logger.log("Creating a new game.");
        let newGame: Game;
        try {
            newGame = this.gameRepository.create(gameData);
            await this.gameRepository.save(newGame);
            Logger.log(`Game created with ID: ${newGame.id}`);
        } catch (error) {
            Logger.error("Error creating game:", error);
            throw new InternalServerErrorException("Could not create game");
        }
        return newGame;
    }

    async delete(id: number): Promise<void> {
        Logger.log(`Deleting game with ID: ${id}`);
        try {
            const result = await this.gameRepository.delete(id);
            if (result.affected === 0) {
                Logger.warn(`Game with ID: ${id} not found for deletion.`);
                throw new InternalServerErrorException(`Game with ID: ${id} not found.`);
            }
            Logger.log(`Game with ID: ${id} successfully deleted.`);
        } catch (error) {
            Logger.error(`Error deleting game with ID: ${id}`, error);
            throw new InternalServerErrorException("Could not delete game");
        }
    }

    async update(id: number, updateData: Partial<Game>): Promise<Game> {
        Logger.log(`Updating game with ID: ${id}`);
        let updatedGame: Game;
        try {
            await this.gameRepository.update(id, updateData);
            updatedGame = await this.findById(id);
            Logger.log(`Game with ID: ${id} successfully updated.`);
        } catch (error) {
            Logger.error(`Error updating game with ID: ${id}`, error);
            throw new InternalServerErrorException("Could not update game");
        }
        return updatedGame;
    }
}