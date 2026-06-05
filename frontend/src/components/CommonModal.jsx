import "./CommonModal.css";
function CommonModal({
  title,
  children,
  onClose,
  onSubmit,
  btnText,
  btnClass 
}) {

  return (

    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h3>{title}</h3>
        </div>

        <div className="modal-body">

          {children}

        </div>
        <div className="modal-actions">
            <button
                className="btn-cancel full-width"
                onClick={onClose}
            >
                Cancel
            </button>

           {btnClass && <button
                className={`full-width ${btnClass}`}
                onClick={onSubmit}
            >
               {btnText} 
            </button>
          }

        </div>

      </div>

    </div>

  );

}

export default CommonModal;