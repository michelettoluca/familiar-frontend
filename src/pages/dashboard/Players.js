import clsx from "clsx";

import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import { Input } from "../../components/shared/Input";
import { Plus } from "phosphor-react";
import { Button } from "../../components/shared/Button";

export const Players = () => {
	const [searchValue, setSearchValue] = React.useState("");

	return (
		<div className="grid grid-cols-[368px_auto]">
			<div className="h-fit rounded-lg border border-gray-200 bg-gray-50 p-6">
				<span className="mb-6 block text-base font-medium text-gray-600">
					Giocatori
				</span>
				<Button className="mb-4 border-dashed bg-transparent py-5" fullWidth>
					<Plus /> Aggiungi un altro giocatore
				</Button>
				<Input
					className="mb-4"
					placeholder="Cerca giocatore"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					searchIcon
					fullWidth
				/>
				<PlayerList searchValue={searchValue} />
			</div>
			<Outlet />
		</div>
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
		<div className="flex h-96 flex-col gap-2 overflow-auto">
			{players.length !== 0 &&
				filteredPlayers.map((player) => (
					<Link
						className={clsx(
							"flex cursor-pointer items-start justify-between rounded-lg border border-gray-200 p-4",
							isActive(player.id) && "bg-white shadow-sm"
						)}
						key={player.id}
						to={`${player.id}`}
						$isActive={isActive(player.id)}
					>
						<div>
							<span className="block font-medium text-gray-600">
								{player.firstName} {player.lastName}
							</span>
							<span className="block text-xs text-gray-400">
								{player.username}
							</span>
						</div>
					</Link>
				))}
		</div>
	);
};
