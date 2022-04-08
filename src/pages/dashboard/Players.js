import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import * as Icon from "../../components/shared/Icons";
import { Heading2, Paragraph } from "../../components/shared/Typography";
import { NewPlayerModal } from "../../components/dashbaord/NewPlayerModal";

export const Players = () => {
	const { user } = useSession();

	const { data: players, status } = useQuery("players", () =>
		api.getLeaguePlayers({ leagueId: user.leagueId })
	);

	const [showModal, setShowModal] = React.useState(false);

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<>
			{showModal && <NewPlayerModal hideModal={() => setShowModal(false)} />}
			<div className="flex items-end justify-between">
				<Heading2>Giocatori</Heading2>
				<Button.Light onClick={() => setShowModal(true)}>
					<Icon.Plus className="h-5 w-5" />
					Aggiungi giocatore
				</Button.Light>
			</div>
			<hr />
			<Container.Root>
				{players?.length !== 0 ? (
					players?.map((player) => (
						<div
							key={player.id}
							className="flex items-end justify-between px-8 py-5 last:border-b-0 border-b border-b-gray-200"
						>
							<div className="flex items-baseline gap-x-1">
								<Link
									to={`${player.id}`}
									className="font-medium hover:underline decoration-2 cursor-pointer"
								>
									{player.firstName} {player.lastName}
								</Link>
								<span className="text-xs font-normal text-gray-400">
									({player.identifier})
								</span>
							</div>
						</div>
					))
				) : (
					<div className="flex items-center justify-between px-8 py-5">
						<Paragraph className="text-gray-400">
							Nessun giocatore trovato
						</Paragraph>
					</div>
				)}
			</Container.Root>
		</>
	);
};
