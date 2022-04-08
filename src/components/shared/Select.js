import styled from "styled-components";

export const Select = styled.select`
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 0.5rem;

	padding: 0.5rem 0.75rem;
	width: ${({ fullWidth }) => fullWidth || "fit-content"};

	color: var(--gray-800);

	background-color: white;

	border: 1px solid var(--gray-300);
	border-radius: 2px;

	&::placeholder {
		color: var(--gray-400);
	}

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
