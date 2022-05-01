import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import { Button } from "../../components/shared/Button";

import { DeleteEventModal } from "../../components/dashbaord/DeleteEventModal";
import { Cards, Trash, Trophy } from "phosphor-react";

export const Event = () => {
	const { eventId } = useParams();

	const [showModal, setShowModal] = React.useState(false);

	const { data: event, status } = useQuery(["event", eventId], () =>
		api.getEvent({ eventId })
	);

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<>
			{showModal && (
				<DeleteEventModal
					hideModal={() => setShowModal(false)}
					eventId={eventId}
				/>
			)}
			<div>
				<div className="flex max-w-5xl items-end justify-between gap-x-4">
					<div className="flex flex-col gap-y-1">
						<div className="flex items-baseline gap-x-2">
							{<h1>{event.name}</h1>}
							<span className="text-gray-400">{formatDate(event.date)}</span>
						</div>
					</div>

					<Button
						variant="dark"
						iconBefore={<Trash className="h-5 w-5" />}
						onClick={() => setShowModal(true)}
					>
						Rimuovi evento
					</Button>
				</div>
				<hr />
				<div className="flex max-w-5xl flex-col gap-4">
					<div>
						{event.results.map((result) => (
							<Result data={result} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

const Result = ({ data: { id, player, archetype, score } }) => {
	const playerFullName = player.firstName + " " + player.lastName;

	return (
		<div
			key={id}
			className="flex items-center justify-between border-b border-b-gray-200 px-8 py-5 last:border-b-0"
		>
			<div className="flex flex-col gap-1">
				<div className="flex items-baseline gap-x-1">
					<Link
						to={`/dashboard/players/${player.id}`}
						className="cursor-pointer font-medium decoration-2 hover:underline"
					>
						{playerFullName}
					</Link>
					<span className="text-xs font-normal text-gray-400">
						({player.username})
					</span>
				</div>

				<div className="flex items-center gap-x-1 text-gray-400">
					<Cards className="h-5 w-5" />
					{archetype.name}
				</div>
			</div>
			<div className="flex gap-1 font-medium">
				{score}
				<Trophy className="h-5 w-5" />
			</div>
		</div>
	);
};
