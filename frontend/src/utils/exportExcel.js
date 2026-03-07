import * as XLSX from 'xlsx';

export const exportToExcel = (students) => {
    if (!students || students.length === 0) return;

    const exportData = students.map((student) => ({
        'ID': student.id,
        'Full Name': student.name,
        'Email Address': student.email,
        'Age': student.age,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    XLSX.writeFile(workbook, 'Student_Records.xlsx');
};
