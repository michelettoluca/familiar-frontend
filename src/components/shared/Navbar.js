import styled, { css } from "styled-components";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

const StyledRoot = styled.div`
	position: sticky;

	background-color: white;

	border: 1px solid var(--gray-200);
`;

export const Root = ({ children }) => (
	<StyledRoot>
		<NavItems>{children}</NavItems>
	</StyledRoot>
);

const NavItems = styled.div`
	display: flex;
	gap: 0.5rem;

	margin: 0 auto;
	padding: 2rem 2rem 0.5rem;

	max-width: 1200px;
`;

export const Logo = styled.span`
	font-weight: 700;
	padding: 0.5rem 0;
	cursor: default;
`;

const StyledItem = styled(Link)`
	margin-left: ${({ $signOut }) => $signOut && "auto"};
	padding: 0.5rem 0.75rem;

	color: var(--gray-400);

	font-weight: 500;
	text-decoration: none;

	border-radius: 6px;
	background-color: none;

	${({ $isActive }) =>
		$isActive
			? css`
					color: var(--gray-800);
					background-color: var(--gray-100);
			  `
			: css`
					&:hover {
						color: var(--gray-600);
						background-color: var(--gray-50);
					}
			  `};
`;

export const Item = ({ to, children, ...props }) => {
	const { pathname } = useResolvedPath(to);
	const isActive = useMatch(pathname);

	return (
		<StyledItem to={to} $isActive={!!isActive} {...props}>
			{children}
		</StyledItem>
	);
};
