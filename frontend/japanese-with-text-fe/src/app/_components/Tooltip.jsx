import "../_styles/tooltip.css"
import { FloatingArrow } from "@floating-ui/react"

export default function Tooltip({ onClose, setFloating, floatingStyles, getFloatingProps, children }) {

	return (
		<div
			className='tooltip'
			ref={setFloating}
			style={{ ...floatingStyles }}
			{...getFloatingProps()}>
			<div className="tooltip-close-wrapper">
				<button className="close-word-menu" onClick={onClose}>x</button>
			</div>
			<div className="tooltip-content">
				{children}
			</div>
		</div >
	)
}
