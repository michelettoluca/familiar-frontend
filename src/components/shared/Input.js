import styled from "styled-components";

const Input = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0.75rem;
	width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};

	border: 1px solid var(--gray-300);
	border-radius: var(--border-radius);

	color: var(--gray-600);

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

export const Password = styled(Input).attrs({ type: "password" })``;

export const Text = styled(Input).attrs({ type: "text" })``;

export const Date = styled(Input).attrs({ type: "date" })``;
