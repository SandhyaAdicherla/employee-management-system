function Toast({
  show,
  message,
  type
}) {

  if (!show) return null;

  return (
    <div className={`toast ${type}`}>

      <div className="toast-icon">
        {type === "success" ? "✓" : "✕"}
      </div>

      <div>
        {message}
      </div>

    </div>
  );
}

export default Toast;