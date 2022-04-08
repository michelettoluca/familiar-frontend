import styled from "styled-components";
import { screenSize } from "../../utils/constants";

export const Root = styled.div`
	display: flex;
	height: 100vh;
	background-color: var(--gray-50);
`;

export const Content = styled.div`
	flex-grow: 1;

	padding: 2rem;

	overflow-y: auto;
	max-width: ${screenSize.laptop};
`;
