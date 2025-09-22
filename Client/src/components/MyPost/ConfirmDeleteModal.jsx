// ConfirmDeleteModal.jsx
import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-message">{message || "Are you sure you want to delete?"}</p>
        <div className="modal-buttons">
          <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn btn-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
