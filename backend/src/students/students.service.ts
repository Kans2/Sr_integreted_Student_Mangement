import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) { }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = this.studentRepository.create(createStudentDto);
        return this.studentRepository.save(student);
    }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async findOne(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }

    async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const student = await this.findOne(id);
        this.studentRepository.merge(student, updateStudentDto);
        return this.studentRepository.save(student);
    }

    async remove(id: number): Promise<void> {
        const student = await this.findOne(id);
        await this.studentRepository.remove(student);
    }
}
