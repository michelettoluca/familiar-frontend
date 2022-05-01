import React from "react";

import { Link, useParams } from "react-router-dom";
import { useQueries } from "react-query";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import { CalendarBlank, Cards, Trophy } from "phosphor-react";

export const Player = () => {
	const { playerId } = useParams();

	const [player, events] = useQueries([
		{
			queryKey: ["players", playerId],
			queryFn: () => api.getPlayer({ playerId }),
		},
		{
			queryKey: ["players", playerId, "events"],
			queryFn: () => api.getPlayerEvents({ playerId }),
		},
	]);

	return (
		<div>
			{player.status === "success" && (
				<>
					<span>
						{player.data.firstName} {player.data.lastName}
					</span>
					<span>{player.data.username}</span>
				</>
			)}

			{player.status === "success" &&
				events.data?.map((event) => <Event data={event} />)}
		</div>
	);
};

const Event = ({ data: { id, name, date, results } }) => {
	const { playerId } = useParams();

	const result = results.find(({ player }) => player.id === playerId);

	const score = result.score;
	const archetype = result.archetype;

	return (
		<Link
			key={id}
			to={`/dashboard/events/${id}`}
			className="flex cursor-pointer items-center justify-between border-b border-b-gray-200 px-8 py-5 last:border-b-0"
		>
			<div className="flex flex-col  gap-1">
				<div className="font-medium">{name}</div>
				<div className="flex items-center gap-x-1 text-gray-400">
					<CalendarBlank size={18} />
					{formatDate(date)}
				</div>
			</div>
			<div className="flex shrink-0 flex-col items-end gap-1">
				<div className="flex gap-x-1 text-gray-400">
					{score}
					<Trophy size={18} />
				</div>
				<div className="flex gap-x-1 text-gray-400">
					{archetype.name}
					<Cards size={18} />
				</div>
			</div>
		</Link>
	);
};
