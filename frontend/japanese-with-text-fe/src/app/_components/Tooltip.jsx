import "../_styles/tooltip.css"
import { FloatingArrow } from "@floating-ui/react"

export default function Tooltip({ setFloating, floatingStyles, getFloatingProps, children }) {

	return (
		<div
			className='tooltip'
			ref={setFloating}
			style={{ ...floatingStyles }}
			{...getFloatingProps()}>
			<div className="tooltip-content">
				{children}
			</div>
		</div>
	)
}
