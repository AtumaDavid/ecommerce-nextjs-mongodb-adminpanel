// components/Toast.tsx
import React, { useEffect } from "react";

type ToastProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  duration?: number; // Duration in milliseconds
};

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer); // Cleanup timer
  }, [onClose, duration]);

  return (
    <div className="toast">
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          animation: slide-in 0.3s ease-out,
            fade-out 0.5s ease-in ${duration / 1000}s;
        }

        @keyframes slide-in {
          from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-out {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
