import styled from "styled-components";

import { useRef, useState } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

const Overlay = styled.div`
	position: fixed;
	inset: 0;

	backdrop-filter: blur(1px) brightness(0.8);

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

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const toggle = () => setIsOpen(!isOpen);

	return { isOpen, open, close, toggle };
};
