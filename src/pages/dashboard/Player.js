import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQueries, useQuery } from "react-query";
import { useModal } from "../../components/shared/Modal";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import * as Button from "../../components/shared/Button";
import * as Icon from "../../components/shared/Icons";
import * as Container from "../../components/shared/Container";
import * as T from "../../components/shared/Typography";

import { DeletePlayerModal } from "../../components/dashbaord/DeletePlayerModal";
import styled from "styled-components";

const StyledPlayer = styled.div`
	display: flex;
`;

const queryStatus = (status, { onLoading, onError, onSuccess }) => {
	console.log(status);
	switch (status) {
		case "loading":
			return onLoading;
		case "error":
			return onError;
		case "success":
			return onSuccess;
		default:
			return null;
	}
};

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
		<StyledPlayer>
			{player.status === "success" && (
				<>
					<T.Heading2>
						{player.data.firstName} {player.data.lastName}
					</T.Heading2>
					<span>{player.data.username}</span>
				</>
			)}

			{player.status === "success" &&
				events.data?.map((event) => (
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
								{/* {getPlayerResult(event).score} */}
								<Icon.Trophy className="h-5 w-5" />
							</div>
							<div className="flex text-gray-400 gap-x-1">
								{/* {getPlayerResult(event).archetype.name} */}
								<Icon.Card className="h-5 w-5" />
							</div>
						</div>
					</div>
				))}
		</StyledPlayer>
	);
};
