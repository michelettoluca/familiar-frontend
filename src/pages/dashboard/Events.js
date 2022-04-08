import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import * as Button from "../../components/shared/Button";
import * as Icon from "../../components/shared/Icons";
import * as Container from "../../components/shared/Container";
import { Heading1, Paragraph } from "../../components/shared/Typography";

export const Events = () => {
	const navigate = useNavigate();
	const { user } = useSession();

	const { data: events, status } = useQuery(
		["league", user.leagueId, "events"],
		() => api.getLeagueEvents({ leagueId: user.leagueId })
	);

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<>
			<div className="flex items-end justify-between">
				<Heading1>Eventi</Heading1>
				<Button.Light onClick={() => navigate("/dashboard/create-event")}>
					<Icon.Plus className="h-5 w-5" />
					Aggiungi evento
				</Button.Light>
			</div>
			<hr />
			<Container.Root>
				{events?.length !== 0 ? (
					events?.map((event) => <Event data={event} />)
				) : (
					<div className="flex items-center justify-between px-8 py-5">
						<Paragraph className="text-gray-400">
							Nessun evento trovato
						</Paragraph>
					</div>
				)}
			</Container.Root>
		</>
	);
};

const Event = ({ data: event }) => {
	const { player } = event.winner;

	const fullName = player
		? player.firstName + " " + player.lastName
		: "Account eliminato";

	return (
		<div
			key={event.id}
			className="flex items-start justify-between px-8 py-5 last:border-b-0 border-b border-b-gray-200"
		>
			<div className="flex flex-col gap-1">
				<Link
					to={`${event.id}`}
					className="font-medium hover:underline decoration-2 cursor-pointer"
				>
					{event.name}
				</Link>

				<div className="flex text-gray-400 gap-x-1">
					<Icon.Calendar className="h-5 w-5" />
					{formatDate(event.date)}
				</div>
			</div>
			<div className="flex flex-col items-end shrink-0 gap-1">
				<div className="flex text-gray-400 gap-x-1">
					<Paragraph className="text-gray-400">{fullName}</Paragraph>
					<Icon.Crown className="h-5 w-5" />
				</div>
				<div className="flex text-gray-400 gap-x-1">
					{event.playerCount}
					<Icon.User className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
};
