import { IsString, IsEmail, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    age?: number;
}
