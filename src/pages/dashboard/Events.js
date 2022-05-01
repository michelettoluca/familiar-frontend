import clsx from "clsx";
import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import { Button } from "../../components/shared/Button";
import { Crown, Plus, UserList } from "phosphor-react";

export const Events = () => {
	const navigate = useNavigate();
	return (
		<div className="grid grid-cols-[368px_auto]">
			<div className="h-fit rounded-lg border border-gray-200 bg-gray-50 p-6">
				<span className="mb-6 block text-base font-medium text-gray-600">
					Eventi
				</span>
				<Button
					className="mb-4 border-dashed bg-transparent py-5"
					onClick={() => navigate("/dashboard/create-event")}
					fullWidth
				>
					<Plus /> Aggiungi un altro evento
				</Button>

				<EventList />
			</div>
			<Outlet />
		</div>
	);
};

const EventList = () => {
	const { user } = useSession();

	const { data: events, status } = useQuery(
		["league", user.leagueId, "events"],
		() => api.getLeagueEvents({ leagueId: user.leagueId })
	);

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<div className="flex h-96 flex-col gap-2 overflow-auto">
			{events.length !== 0
				? events.map((event) => <Event data={event} />)
				: null}
		</div>
	);
};

const Event = ({ data: { id, name, date, results } }) => {
	const { eventId } = useParams();

	const winnerFullName =
		results[0].player.firstName + " " + results[0].player.lastName;

	const playerCount = results.length;

	const isActive = (eId) => eId === eventId;

	return (
		<Link
			className={clsx(
				"flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4",
				isActive(id) && "bg-white shadow-sm"
			)}
			key={id}
			to={`${id}`}
			$isActive={isActive(id)}
		>
			<div>
				<span className="block font-medium text-gray-600">{name}</span>
				<span className="text-xs text-gray-400">{formatDate(date)}</span>
			</div>

			<div className="flex flex-col items-end">
				<div className="flex items-center gap-1.5 text-gray-400">
					<span className="text-xs">{winnerFullName}</span>
					<Crown size={18} />
				</div>
				<div className="flex items-center gap-1.5 text-gray-400">
					<span className="text-xs">{playerCount}</span>
					<UserList size={18} />
				</div>
			</div>
		</Link>
	);
};
