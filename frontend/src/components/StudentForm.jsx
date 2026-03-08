import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import './StudentForm.css';

function StudentForm({ onSave, editingStudent, onCancel, loading }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingStudent) {
            setFormData({
                name: editingStudent.name || '',
                email: editingStudent.email || '',
                age: editingStudent.age || ''
            });
            setErrors({});
        } else {
            setFormData({ name: '', email: '', age: '' });
            setErrors({});
        }
    }, [editingStudent]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
            newErrors.age = 'Age must be a valid positive number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave({ ...formData, age: Number(formData.age) });
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', email: '', age: '' });
        setErrors({});
        onCancel();
    };

    return (
        <div className="modal-overlay">
            <div className="glass-panel form-panel modal-content">
                <button className="close-btn" onClick={handleCancel} type="button">
                    <X size={20} />
                </button>
                <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                <form onSubmit={handleSubmit} className="student-form">

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            disabled={loading}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="text"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            disabled={loading}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            type="number"
                            min="1"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="21"
                            disabled={loading}
                        />
                        {errors.age && <span className="error-text">{errors.age}</span>}
                    </div>

                    <div className="form-actions">
                        {editingStudent && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                <X size={18} /> Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            style={{ flex: 1, justifyContent: 'center' }}
                        >
                            <Save size={18} /> {editingStudent ? 'Update Details' : 'Save Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentForm;
