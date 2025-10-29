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
			<button ref={refs.setReference} {...getReferenceProps()}>{definedWord.original_word}</button>
			{isOpen && (
				isMobile ? (
					<BottomModal setFloating={refs.setFloating} getFloatingProps={getFloatingProps}
						onClose={() => setIsOpen(false)}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</BottomModal>
				) : (
					< Tooltip setFloating={refs.setFloating} floatingStyles={floatingStyles} getFloatingProps={getFloatingProps}>
						Tooltip with lots of stuff in it
						<button>another button</button>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<p>
							There are many example projects created by the React community. We’re keeping this page focused on the ones that use React without third-party state management libraries.

							If you add a project, please commit to keeping it up to date with the latest versions of React.
							dgsdgfsgsfgsfgsf

							f
							hsfhfghsfghsf

							fhsfhsfhsfh

							sfhsfhhsfhsfMeta Front-End Developer Professional Certificate - Launch your career as a front-end developer. Build job-ready skills for an in-demand career and earn a credential from Meta. No degree or prior experience required to get started.
						</p>

					</Tooltip >
				)
			)
			}
		</>
	)

}
