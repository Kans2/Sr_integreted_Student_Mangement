import { IsString, IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @Min(1)
    age: number;
}
