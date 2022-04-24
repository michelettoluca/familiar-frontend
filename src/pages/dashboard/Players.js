import styled, { css } from "styled-components";

import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import * as Container from "../../components/shared/Container";
import * as T from "../../components/shared/Typography";
import { Input } from "../../components/shared/Input";
import { Plus } from "phosphor-react";

const StyledPlayers = styled(Container.Root)`
	background-color: var(--gray-50);
	display: grid;
	gap: 1rem;
`;

const StyledPlayerList = styled.div`
	height: 100%;
	overflow-y: auto;
	display: grid;
	gap: 0.5rem;
`;

const Player = styled(Link)`
	text-decoration: none;

	padding: 1rem;

	border: 1px solid var(--gray-200);
	border-radius: 0.5rem;

	${({ $isActive }) =>
		$isActive &&
		css`
			background-color: var(--white);
			box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 4px;
			border: 1px solid var(--gray-300);
		`}
`;

const FullName = styled.span`
	display: block;
	color: var(--gray-800);
	font-weight: 600;
`;

const Username = styled.span`
	color: var(--gray-600);
	font-size: 0.75rem;
`;

const PageLayout = styled.div`
	display: grid;
	gap: 4rem;
	grid-template-columns: 1fr 2fr;
`;

const DashedButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	padding: 1rem 1.25rem;

	width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};

	color: var(--gray-600);

	border: 1px dashed var(--gray-300);
	border-radius: var(--border-radius);
	stroke-dashoffset: 4px;
	stroke-dasharray: 4px;
	background-color: var(--gray-100);
`;

export const Players = () => {
	const [searchValue, setSearchValue] = React.useState("");

	return (
		<PageLayout>
			<StyledPlayers>
				<T.Heading5>Giocatori</T.Heading5>
				<DashedButton fullWidth>
					<Plus /> Aggiungi un altro giocatore
				</DashedButton>
				<Input
					placeholder="Cerca giocatore"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					fullWidth
				/>
				<PlayerList searchValue={searchValue} />
			</StyledPlayers>
			<Outlet />
		</PageLayout>
	);
};

const PlayerList = ({ searchValue }) => {
	const { user } = useSession();
	const { playerId } = useParams();

	const isActive = (pId) => pId === playerId;

	const { data: players, status } = useQuery("players", () =>
		api.getLeaguePlayers({ leagueId: user.leagueId })
	);

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	const filteredPlayers = players.filter((p) => {
		const combinations = [
			p.firstName + " " + p.lastName,
			p.lastName + " " + p.firstName,
			p.username,
		];

		return combinations.some((c) =>
			c
				.toLowerCase()
				.includes(searchValue.trim().replace(/\s\s+/g, " ").toLowerCase())
		);
	});

	return (
		<StyledPlayerList>
			{players.length !== 0
				? filteredPlayers.map((player) => (
						<Player
							key={player.id}
							to={`${player.id}`}
							$isActive={isActive(player.id)}
						>
							<FullName>
								{player.firstName} {player.lastName}
							</FullName>
							<Username>{player.username}</Username>
						</Player>
				  ))
				: null}
		</StyledPlayerList>
	);
};
