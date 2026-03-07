import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, Loader2, Users } from 'lucide-react';
import Swal from 'sweetalert2';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import ConfirmDialog from './components/ConfirmDialog';
import { exportToExcel } from './utils/exportExcel';
import './App.css';

// Base URL for the NestJS API
const API_URL = 'http://localhost:3000/students';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setStudents(data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error Fetching Details',
        text: 'Could not fetch students from the backend. Make sure the NestJS server is running.',
        background: '#1e293b',
        color: '#f8fafc'
      });
    } finally {
      // Artificially simulate loading state slightly longer for wow-factor
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaveStudent = async (studentData) => {
    try {
      setLoading(true);
      if (editingStudent) {
        // Update existing
        await axios.put(`${API_URL}/${editingStudent.id}`, studentData);
        Swal.fire({ icon: 'success', title: 'Updated Successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#1e293b', color: '#f8fafc' });
      } else {
        // Create new
        await axios.post(API_URL, studentData);
        Swal.fire({ icon: 'success', title: 'Created Successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#1e293b', color: '#f8fafc' });
      }
      setEditingStudent(null);
      await fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Action Failed', text: err.response?.data?.message?.join(', ') || 'Something went wrong.', background: '#1e293b', color: '#f8fafc' });
      setLoading(false);
    }
  };

  const handleDeleteRequest = (student) => {
    setStudentToDelete(student);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      setLoading(true);
      setShowDeleteDialog(false);
      await axios.delete(`${API_URL}/${studentToDelete.id}`);
      Swal.fire({ icon: 'success', title: 'Deleted', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#1e293b', color: '#f8fafc' });
      await fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Delete Failed', background: '#1e293b', color: '#f8fafc' });
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <Users size={28} color="#6366f1" />
          Student Portal
        </h1>
        <button
          className="btn btn-secondary"
          onClick={() => exportToExcel(students)}
          disabled={loading || students.length === 0}
        >
          <Download size={18} />
          Export to Excel
        </button>
      </header>

      <div className="grid-layout">
        {/* Sidebar Form */}
        <div>
          <StudentForm
            onSave={handleSaveStudent}
            editingStudent={editingStudent}
            onCancel={() => setEditingStudent(null)}
            loading={loading}
          />
        </div>

        {/* Main Table Area */}
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          {loading && students.length === 0 ? (
            <div className="loading-spinner">
              <Loader2 size={40} className="rotate-anim" />
            </div>
          ) : (
            <StudentTable
              students={students}
              onEdit={setEditingStudent}
              onDelete={handleDeleteRequest}
              loading={loading}
            />
          )}
        </div>
      </div>

      {showDeleteDialog && (
        <ConfirmDialog
          student={studentToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}

export default App;
