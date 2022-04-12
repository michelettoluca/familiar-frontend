import styled from "styled-components";

import { useRef, useState } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useCallback } from "react";

const Overlay = styled.div`
	position: fixed;
	inset: 0;

	background-color: rgba(0, 0, 0, 0.5);

	z-index: 20;
`;

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;

	transform: translate(-50%, -50%);

	z-index: 30;
`;

export const Modal = ({ onClickOutside, children, ...props }) => {
	const modalRef = useRef(null);

	useClickOutside(modalRef, onClickOutside);

	return (
		<>
			<Overlay />
			<StyledModal ref={modalRef} {...props}>
				{children}
			</StyledModal>
		</>
	);
};

export const useModal = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

	return { isOpen, open, close, toggle };
};
