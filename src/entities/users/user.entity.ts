import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  @IsString({ always: true })
  name: string;

  @Column()
  @ApiProperty()
  @IsString({ always: true })
  surname: string;

  @ApiProperty()
  @IsEmail({}, { always: true })
  @MaxLength(300, { always: true })
  @Index()
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty()
  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(20, { always: true })
  @IsNotEmpty()
  @Column({ type: 'text' })
  password: string;

  @Column()
  @ApiProperty()
  @IsString({ always: true })
  phone: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  @IsBoolean()
  isStatus: boolean;

}
