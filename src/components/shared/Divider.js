import styled from "styled-components";

const Divider = styled.div`
	background-color: var(--gray-200);
`;

export const Horizontal = styled(Divider)`
	height: 1px;
	width: 100%;

	margin: 1rem 0;
`;

export const Vertical = styled(Divider)`
	height: 100%;
	width: 1px;
	margin: 0 1rem;
`;
