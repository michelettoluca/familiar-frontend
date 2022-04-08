import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { useModal } from "../../components/shared/Modal";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";
import { getQueriesStatus } from "../../utils/getQueriesStatus";

import * as Button from "../../components/shared/Button";
import * as Icon from "../../components/shared/Icons";
import * as Container from "../../components/shared/Container";
import { Heading2 } from "../../components/shared/Typography";

import { DeletePlayerModal } from "../../components/dashbaord/DeletePlayerModal";

export const Player = () => {
	const navigate = useNavigate();
	const { playerId } = useParams();

	const { isModalOpen, closeModal } = useModal();

	const queries = useQueries([
		{
			queryKey: ["players", playerId],
			queryFn: () => api.getPlayer({ playerId }),
		},
		{
			queryKey: ["players", playerId, "events"],
			queryFn: () => api.getPlayerEvents({ playerId }),
		},
	]);

	const status = getQueriesStatus(queries);

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	const [{ data: player }, { data: events }] = queries;

	const getPlayerResult = (event) =>
		event.results.find((result) => result.playerId === playerId);

	return (
		<>
			{isModalOpen && <DeletePlayerModal close={closeModal} player={player} />}
			<Button.Light
				iconBefore={<Icon.ChevronUp className="-rotate-90 " />}
				onClick={() => navigate("/dashboard/players")}
			>
				Giocatori
			</Button.Light>
			<div className="flex justify-between items-end max-w-5xl gap-x-4">
				<div className="flex flex-col gap-y-1">
					<Heading2>{player.firstName + " " + player.lastName}</Heading2>
				</div>

				<Button.Red onClick={closeModal}>
					<Icon.Trash className="h-5 w-5" />
					Rimuovi giocatore
				</Button.Red>
			</div>
			<hr />
			<div className="flex flex-col max-w-5xl gap-4">
				<Container.Root>
					{events?.length !== 0 ? (
						events?.map((event) => (
							<div
								key={event.id}
								className="flex items-center justify-between px-8 py-5 last:border-b-0 border-b border-b-gray-200"
							>
								<div className="flex flex-col  gap-1">
									<Link
										to={`/dashboard/events/${event.id}`}
										className="font-medium hover:underline decoration-2 cursor-pointer"
									>
										{event.name}
									</Link>
									<div className="flex items-center text-gray-400 gap-x-1">
										<Icon.Calendar className="h-5 w-5" />
										{formatDate(event.date)}
									</div>
								</div>
								<div className="flex flex-col items-end shrink-0 gap-1">
									<div className="flex text-gray-400 gap-x-1">
										{getPlayerResult(event).score}
										<Icon.Trophy className="h-5 w-5" />
									</div>
									<div className="flex text-gray-400 gap-x-1">
										{getPlayerResult(event).archetype.name}
										<Icon.Card className="h-5 w-5" />
									</div>
								</div>
							</div>
						))
					) : (
						<div className="flex items-center px-8 py-5 last:border-b-0 border-b border-b-gray-200">
							<span className="text-gray-400">Nessuno evento trovato</span>
						</div>
					)}
				</Container.Root>
			</div>
		</>
	);
};
