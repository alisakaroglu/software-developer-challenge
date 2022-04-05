import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class AdCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  @IsString({ always: true })
  phone: string;

  @Column()
  @ApiProperty()
  @IsString({ always: true })
  name: string;

  @Column()
  @ApiProperty()
  @IsString({ always: true })
  surname: string;

  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(20, { always: true })
  @IsNotEmpty()
  @Column({ type: 'text' })
  password: string;
  
  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  @IsBoolean({ always: true })
  isStatus: boolean;

}
