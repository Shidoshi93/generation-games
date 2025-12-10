import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";
import { GameController } from "./controller/game.controller";
import { GameService } from "./sevice/game.service";

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GameController],
    providers: [GameService],
    exports: [],
})
export class GameModule {}