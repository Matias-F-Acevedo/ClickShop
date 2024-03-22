import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, MaxLength, MinLength, IsNumber } from "class-validator";

export class CreatePublicationDto {

    @Expose()
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(55)
    @MinLength(3)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    content: string;
  }

