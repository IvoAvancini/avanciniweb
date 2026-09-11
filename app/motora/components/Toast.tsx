"use client";

import { useMotora } from "../store/useMotoraStore";

export function ToastContainer() {
  const { toasts, removeToast } = useMotora();

  if (toasts.length === 0) return null;

  return (
    <div className="v-toast-container" aria-live="polite" role="status">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="v-toast-item"
          onClick={() => removeToast(toast.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") removeToast(toast.id);
          }}
          style={{ cursor: "pointer", borderLeft: toast.type === "success" ? "3px solid #10b981" : "3px solid #f59e0b" }}
        >
          <div className="v-toast-title">{toast.title}</div>
          <div className="v-toast-msg">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
