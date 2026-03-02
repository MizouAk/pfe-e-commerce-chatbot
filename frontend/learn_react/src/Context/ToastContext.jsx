import React, { createContext, useContext, useState, useCallback } from "react";
import Toast, { ConfirmBox } from "../Composantes/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);
	const [confirmOptions, setConfirmOptions] = useState(null);

	const show = useCallback((message, { type = "info", duration = 3000 } = {}) => {
		const id = Date.now() + Math.random();
		setToasts((prev) => [...prev, { id, message, type }]);
		if (duration > 0) {
			setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
		}
		return id;
	}, []);

	const removeToast = useCallback((id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const confirm = useCallback((message) => {
		return new Promise((resolve) => {
			setConfirmOptions({ message, resolve });
		});
	}, []);

	const handleConfirm = () => {
		if (confirmOptions) {
			confirmOptions.resolve(true);
			setConfirmOptions(null);
		}
	};

	const handleCancel = () => {
		if (confirmOptions) {
			confirmOptions.resolve(false);
			setConfirmOptions(null);
		}
	};

	return (
		<ToastContext.Provider value={{ show, confirm }}>
			{children}
			<Toast toasts={toasts} onRemove={removeToast} />
			{confirmOptions && (
				<ConfirmBox message={confirmOptions.message} onConfirm={handleConfirm} onCancel={handleCancel} />
			)}
		</ToastContext.Provider>
	);
}

export function useToast() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}
