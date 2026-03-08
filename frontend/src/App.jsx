import { useState, useEffect } from 'react';

import { Download, Loader2, Users } from 'lucide-react';
import Swal from 'sweetalert2';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import ConfirmDialog from './components/ConfirmDialog';
import { exportToExcel } from './utils/exportExcel';
import './App.css';

// Base URL for the NestJS API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/students';

// Helper for logging fetch calls
const fetchWithLogging = async (url, options = {}) => {
  const method = options.method || 'GET';
  const startTime = new Date();


  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API request failed');
    }

    // Only parse JSON if content exists
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return null;
  } catch (err) {
    const duration = new Date() - startTime;
    console.error(` ${err.message} (${duration}ms)`);
    throw err;
  }
};


function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchWithLogging(API_URL);
      setStudents(data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error Fetching Details',
        text: 'Could not fetch students from the backend. Make sure the NestJS server is running.',
        background: '#ffffff',
        color: '#0f172a'
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
        await fetchWithLogging(`${API_URL}/${editingStudent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
        Swal.fire({ icon: 'success', title: 'Updated Successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#ffffff', color: '#0f172a' });
      } else {
        // Create new
        await fetchWithLogging(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
        Swal.fire({ icon: 'success', title: 'Created Successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#ffffff', color: '#0f172a' });
      }
      setEditingStudent(null);
      setIsFormOpen(false);
      await fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Action Failed', text: err.message || 'Something went wrong.', background: '#ffffff', color: '#0f172a' });
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
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
      await fetchWithLogging(`${API_URL}/${studentToDelete.id}`, {
        method: 'DELETE',
      });
      Swal.fire({ icon: 'success', title: 'Deleted', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, background: '#ffffff', color: '#0f172a' });
      await fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Delete Failed', background: '#ffffff', color: '#0f172a' });
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <Users size={28} color="#4f46e5" />
          Student Portal
        </h1>
        <div className="header-actions" style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="btn"
            onClick={() => setIsFormOpen(true)}
            disabled={loading}
          >
            Add Student
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => exportToExcel(students)}
            disabled={loading || students.length === 0}
          >
            <Download size={18} />
            Export to Excel
          </button>
        </div>
      </header>

      <main className="content-area">
        <div className="glass-panel main-panel">
          {loading && students.length === 0 ? (
            <div className="loading-spinner">
              <Loader2 size={40} className="rotate-anim" />
            </div>
          ) : (
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              loading={loading}
            />
          )}
        </div>
      </main>

      {isFormOpen && (
        <StudentForm
          onSave={handleSaveStudent}
          editingStudent={editingStudent}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingStudent(null);
          }}
          loading={loading}
        />
      )}

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
