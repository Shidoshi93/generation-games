import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";

@Entity('game')
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    title: string;

    @Column({ nullable: true, length: 1000 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    developer: string;

    @IsNotEmpty()
    @Column({ type: 'timestamp', nullable: false })
    releaseDate: Date;

    @Column({ type: 'float', nullable: true })
    rating: number;

    @UpdateDateColumn()
    @Column({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn()
    @Column({ type: 'timestamp' })
    updatedAt: Date;
    
    @ManyToOne(() => Category, (category) => category.games)
    category: Category;
}