import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<import("./student.entity").Student>;
    findAll(): Promise<import("./student.entity").Student[]>;
    findOne(id: number): Promise<import("./student.entity").Student>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<import("./student.entity").Student>;
    remove(id: number): Promise<void>;
}
