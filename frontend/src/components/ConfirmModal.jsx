function ConfirmModal({
  show,
  onClose,
  onConfirm
}) {

  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h3>Delete Employee</h3>

        <p>
          Are you sure you want to delete this employee?
        </p>

        <div className="modal-actions">

          <button
            className="btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;