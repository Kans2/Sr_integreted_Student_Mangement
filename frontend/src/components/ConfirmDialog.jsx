import { AlertTriangle, X } from 'lucide-react';
import './ConfirmDialog.css';

function ConfirmDialog({ student, onConfirm, onCancel }) {
    if (!student) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-content glass-panel">
                <button className="close-btn" onClick={onCancel}>
                    <X size={20} />
                </button>

                <div className="dialog-header">
                    <div className="icon-wrapper">
                        <AlertTriangle size={32} color="#ef4444" />
                    </div>
                    <h3>Delete Student</h3>
                </div>

                <div className="dialog-body">
                    <p>Are you sure you want to delete <strong>{student.name}</strong> from the records? This action cannot be undone.</p>
                </div>

                <div className="dialog-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
