"use client";

import { useVertice } from "../store/useVerticeStore";

export function ToastContainer() {
  const { toasts, removeToast } = useVertice();

  if (toasts.length === 0) return null;

  return (
    <div className="v-toast-container" aria-live="polite" role="status">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`v-toast-item v-toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") removeToast(toast.id);
          }}
        >
          <div className="v-toast-title">{toast.title}</div>
          <div className="v-toast-msg">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
