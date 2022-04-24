import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import { Button } from "../../components/shared/Button";
import * as Icon from "../../components/shared/Icons";
import * as Container from "../../components/shared/Container";
import { Heading1 } from "../../components/shared/Typography";

import { DeleteEventModal } from "../../components/dashbaord/DeleteEventModal";

export const Event = () => {
	const { eventId } = useParams();

	const navigate = useNavigate();

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
			<Button onClick={() => navigate("/dashboard/events")}>
				<Icon.ChevronUp className="-rotate-90 " />
				Eventi
			</Button>
			<div className="flex justify-between items-end max-w-5xl gap-x-4">
				<div className="flex flex-col gap-y-1">
					<div className="flex gap-x-2 items-baseline">
						{<Heading1>{event.name}</Heading1>}
						<span className="text-gray-400">
							{capitalizeFirstLetter(formatDate(event.date))}
						</span>
					</div>
				</div>

				<Button
					variant="dark"
					iconBefore={<Icon.Trash className="h-5 w-5" />}
					onClick={() => setShowModal(true)}
				>
					Rimuovi evento
				</Button>
			</div>
			<hr />
			<div className="flex flex-col max-w-5xl gap-4">
				<Container.Root>
					{event.results.map((result) => (
						<div
							key={result.id}
							className="flex items-center justify-between px-8 py-5 last:border-b-0 border-b border-b-gray-200"
						>
							<div className="flex flex-col gap-1">
								{result?.player ? (
									<div className="flex items-baseline gap-x-1">
										<Link
											to={`/dashboard/players/${result.playerId}`}
											className="font-medium hover:underline decoration-2 cursor-pointer"
										>
											{result.player.firstName} {result.player.lastName}
										</Link>
										<span className="text-xs font-normal text-gray-400">
											({result.player.identifier})
										</span>
									</div>
								) : (
									<span>Account eliminato</span>
								)}
								<div className="flex items-center text-gray-400 gap-x-1">
									<Icon.Card className="h-5 w-5" />
									{result.archetype.name}
								</div>
							</div>
							<div className="flex gap-1 font-medium">
								{result.score}
								<Icon.Trophy className="h-5 w-5" />
							</div>
						</div>
					))}
				</Container.Root>
			</div>
		</>
	);
};
