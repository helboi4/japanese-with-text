import "../_styles/bottomModal.css"

export default function BottomModal({ onClose, children, getFloatingProps, setFloating }) {
	return (
		<div className="bottom-modal-backdrop">
			<div {...getFloatingProps()} ref={setFloating} className="bottom-modal-container">
				<button className="bottom-modal-close" onClick={onClose}>x</button>
				<div className="bottom-modal-content">
					{children}
				</div>
			</div>
		</div>
	);
}
