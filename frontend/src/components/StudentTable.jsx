import { Edit2, Trash2 } from 'lucide-react';
import './StudentTable.css';

function StudentTable({ students, onEdit, onDelete, loading, searchQuery }) {
    if (students.length === 0 && !loading) {
        if (searchQuery) {
            return (
                <div className="empty-state">
                    <p>No students match your search query '{searchQuery}'.</p>
                </div>
            );
        }
        return (
            <div className="empty-state">
                <p>No students found. Add one to get started!</p>
            </div>
        );
    }

    return (
        <table className="student-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th className="align-right">Actions</th>
                </tr>
            </thead>
            <tbody className={loading ? "fade-loading" : ""}>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td className="actions align-right">
                            <button
                                className="btn-icon edit"
                                onClick={() => onEdit(student)}
                                disabled={loading}
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                className="btn-icon delete"
                                onClick={() => onDelete(student)}
                                disabled={loading}
                            >
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentTable;
