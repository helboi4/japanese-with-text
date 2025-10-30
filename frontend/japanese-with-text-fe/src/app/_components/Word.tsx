'use client'
import { useState, useRef } from "react";
import DefinedWord from "../_types/definedWord";
import { autoUpdate, useFloating, useRole, useClick, useDismiss, useInteractions, autoPlacement, size, offset, flip, shift, useId } from '@floating-ui/react';
import BottomModal from "./BottomModal";
import Tooltip from "./Tooltip"
import { useIsMobile } from "../_utils/useIsMobile";

export default function Word({ definedWord }: { definedWord: DefinedWord }) {


	const [isOpen, setIsOpen] = useState(false);

	const isMobile = useIsMobile(600);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(5),
			autoPlacement({ padding: 10 }),
			shift({ padding: 10 }),
			size({
				apply({ availableHeight, elements }) {
					Object.assign(elements.floating.style, {
						maxHeight: `${availableHeight}px`,
						overflow: 'auto'
					});
				},
				padding: 10,
			}),
		],
		whileElementsMounted: autoUpdate,
	})

	const click = useClick(context);
	const dismiss = useDismiss(context, {
		outsidePressEvent: "mousedown",
	});
	const role = useRole(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role,
	])

	return (
		<>
			<button className="word-button" ref={refs.setReference} {...getReferenceProps()}>{definedWord.original_word}</button>
			{isOpen && (
				isMobile ? (
					<BottomModal setFloating={refs.setFloating} getFloatingProps={getFloatingProps}
						onClose={() => setIsOpen(false)}>
						<p>
							{JSON.stringify(definedWord.dict_entries)}
						</p>
					</BottomModal>
				) : (
					< Tooltip setFloating={refs.setFloating} floatingStyles={floatingStyles} getFloatingProps={getFloatingProps}>
						<p>
							{JSON.stringify(definedWord.dict_entries)}
						</p>
					</Tooltip >
				)
			)
			}
		</>
	)

}
