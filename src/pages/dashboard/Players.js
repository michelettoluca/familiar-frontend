import styled from "styled-components";

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import * as Container from "../../components/shared/Container";
import * as Divider from "../../components/shared/Divider";
import * as Button from "../../components/shared/Button";
import * as Icon from "../../components/shared/Icons";
import * as T from "../../components/shared/Typography";
import { NewPlayerModal } from "../../components/dashbaord/NewPlayerModal";

const PlusIcon = styled(Icon.Plus)`
	height: 1rem;
	width: 1rem;
`;

const PlayerList = styled(Container.Root)`
	padding: 0;
`;

const Player = styled.div`
	padding: 1.25rem;
	:not(:last-child) {
		border-bottom: 1px solid var(--gray-300);
	}
`;

const FullName = styled(Link)`
	color: inherit;
	font-weight: 500;
	text-decoration-thickness: 2px;
`;

const Username = styled.span`
	font-size: 0.75rem;
`;

export const Players = () => {
	const { user } = useSession();

	const { data: players, status } = useQuery("players", () =>
		api.getLeaguePlayers({ leagueId: user.leagueId })
	);

	const [showModal, setShowModal] = React.useState(false);

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<>
			{showModal && <NewPlayerModal hideModal={() => setShowModal(false)} />}
			<div className="flex items-end justify-between">
				<T.Heading4>Giocatori</T.Heading4>
				<Button.Light onClick={() => setShowModal(true)}>
					<PlusIcon />
					Aggiungi giocatore
				</Button.Light>
			</div>
			<Divider.Horizontal />
			<PlayerList>
				{players?.length !== 0 ? (
					players?.map((player) => (
						<Player key={player.id}>
							<FullName to={`${player.id}`}>
								{player.firstName} {player.lastName}
							</FullName>
							<Username> ({player.username})</Username>
						</Player>
					))
				) : (
					<div className="flex items-center justify-between px-8 py-5">
						<T.EmptyState>Nessun giocatore trovato</T.EmptyState>
					</div>
				)}
			</PlayerList>
		</>
	);
};
