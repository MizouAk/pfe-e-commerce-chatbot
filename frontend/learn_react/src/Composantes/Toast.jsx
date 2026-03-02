import React from "react";
import "./Toast.css";

export default function Toast({ toasts, onRemove }) {
  return (
    <div className="toasts-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type || "info"}`}>
          <span className="toast-message">{t.message}</span>
          <button className="toast-close" onClick={() => onRemove(t.id)} aria-label="Close">×</button>
        </div>
      ))}
    </div>
  );
}

export function ConfirmBox({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-box" role="dialog" aria-modal="false">
      <button className="confirm-close" onClick={onCancel} aria-label="Close">×</button>
      <div className="confirm-message">{message}</div>
      <div className="confirm-buttons">
        <button className="confirm-cancel" onClick={onCancel}>Annuler</button>
        <button className="confirm-ok" onClick={onConfirm}>Confirmer</button>
      </div>
    </div>
  );
}
