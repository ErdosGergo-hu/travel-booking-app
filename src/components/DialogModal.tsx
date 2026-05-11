import { createPortal } from "react-dom";

type DialogModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export default function DialogModal({
  open,
  message,
  onClose,
}: DialogModalProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-container-background/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-[#262626] p-6 shadow-xl text-center">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>

        <p className="mt-4 text-secondary-font">{message}</p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-[#262626] hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
}
