import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { GameService } from "../sevice/game.service";
import { Game } from "../entities/game.entity";

@Controller("game")
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllGames(): Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getGameById(@Param("id", ParseIntPipe) id: number): Promise<Game> {
        return this.gameService.findById(id);
    }

    @Get("/category/:categoryName")
    @HttpCode(HttpStatus.OK)
    async getGamesByCategoryName(@Param("categoryName") categoryName: string): Promise<Game[]> {
        return this.gameService.findGamesByCategoryName(categoryName);
    }

    
    @Get("/category/id/:categoryId")
    @HttpCode(HttpStatus.OK)
    async getGamesByCategoryId(@Param("categoryId", ParseIntPipe) categoryId: number): Promise<Game[]> {
        return this.gameService.findGamesByCategoryId(categoryId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createGame(@Body() gameData: Game): Promise<Game> {
        return this.gameService.create(gameData);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.OK)
    async updateGame(@Body() gameData: Game): Promise<Game> {
        return this.gameService.update(gameData);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteGame(id: number): Promise<void> {
        return this.gameService.delete(id);
    }
}
