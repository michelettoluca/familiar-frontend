import styled from "styled-components";

const Heading = styled.span`
	font-family: "Inter", sans-serif;
	font-weight: 700;
	color: var(--gray-800);
`;

export const Heading1 = styled(Heading)`
	font-size: 2rem;
`;

export const Heading2 = styled(Heading)`
	font-size: 1.75rem;
`;

export const Heading3 = styled(Heading)`
	font-size: 1.5rem;
`;

export const Heading4 = styled(Heading)`
	font-size: 1.25rem;
`;

export const Heading5 = styled(Heading)`
	font-size: 1rem;
	margin-bottom: 1rem;
`;

export const Heading6 = styled(Heading)`
	font-size: 0.75rem;
`;

export const Paragraph = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	color: var(--gray-600);
`;

export const EmptyState = styled.span`
	font-size: 0.875rem;
	color: var(--gray-400);
`;
