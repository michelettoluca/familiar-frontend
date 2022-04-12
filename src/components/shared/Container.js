import styled from "styled-components";

export const Root = styled.div`
	padding: 1.25rem 1rem;

	max-width: ${({ maxWidth }) => maxWidth};

	background-color: white;

	border: 1px solid var(--gray-200);
	border-radius: var(--border-radius);
`;
