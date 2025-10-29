export default function BottomModal({ onClose, children, getFloatingProps, setFloating }) {

	console.log(children);

	return (
		<div className="bottom-modal-backdrop">
			<div {...getFloatingProps()} ref={setFloating} className="bottom-modal-container">
				<button className="bottom-modal-close" onClick={onClose}>Close</button>
				<div className="bottom-modal-content">
					{children}
				</div>
			</div>
		</div>
	);
}
