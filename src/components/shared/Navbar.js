import styled from "styled-components";

import { Link } from "react-router-dom";

import { screenSize } from "../../utils/constants";

export const Root = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;

	border-right: 1px solid var(--gray-300);
	padding: 0.5rem;

	width: 16rem;

	@media (max-width: ${screenSize.laptop}) {
		width: auto;
	}
`;

const StyledLogo = styled.div`
	display: flex;
	flex-direction: column;

	padding: 0.5rem 0.75rem;
`;

const FamiliarLogo = styled.h2`
	font-family: "Poppins", sans-serif;

	&::after {
		content: "Familiar.";
	}

	@media (max-width: ${screenSize.laptop}) {
		&::after {
			content: "F.";
		}
	}
`;

const Domain = styled.span`
	@media (max-width: ${screenSize.laptop}) {
		display: none;
	}
`;

export const Logo = ({ domain }) => {
	return (
		<StyledLogo>
			<FamiliarLogo />
			{domain && <Domain>{domain}</Domain>}
		</StyledLogo>
	);
};

const StyledItem = styled(Link)`
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0.5rem 0.75rem;

	color: var(--gray-400);
	text-decoration: none;

	border-radius: 2px;

	&:hover {
		color: var(--gray-600);
		background-color: var(--gray-100);
	}
`;

const Label = styled.span`
	@media (max-width: ${screenSize.laptop}) {
		display: none;
	}
`;

export const Item = ({ icon, children, ...props }) => {
	return (
		<StyledItem {...props}>
			{icon}
			<Label>{children}</Label>
		</StyledItem>
	);
};
