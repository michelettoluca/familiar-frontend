import styled from "styled-components";

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 0.5rem;

	padding: ${({ small }) => (small ? "0.5rem" : "0.75rem")};
	width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};

	border: 1px solid transparent;
	border-radius: var(--border-radius);

	cursor: pointer;

	&:hover {
		filter: brightness(1.02);
	}

	&:active {
		filter: brightness(0.98);
	}

	&:focus {
		outline: 2px solid var(--gray-800);
		outline-offset: 1px;
	}
`;

export const Light = styled(Button)`
	color: var(--gray-800);
	background-color: white;
	border-color: var(--gray-300);
`;

export const Dark = styled(Button)`
	color: var(--gray-50);
	background-color: var(--gray-800);
`;

export const Red = styled(Button)`
	color: var(--gray-50);
	background-color: var(--red-500);
`;
