import styled from "styled-components";

export const Root = styled.div`
	padding: 1.25rem 1rem;

	max-width: ${({ maxWidth }) => maxWidth};

	background-color: white;

	/* shadow */

	border: 1px solid var(--gray-300);
	border-radius: 2px;
`;
