import clsx from "clsx";

import React from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";
import { getQueriesStatus } from "../../utils/getQueriesStatus";

import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";
import { Select } from "../../components/shared/Select";

import { NewPlayerModal } from "../../components/dashbaord/NewPlayerModal";

import { CaretLeft, Check, DotsThree } from "phosphor-react";
import { eventTypes } from "../../utils/constants";

const CreateEventContext = React.createContext();

export const CreateEvent = () => {
	const { user } = useSession();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const queries = useQueries([
		{
			queryKey: "players",
			queryFn: () => api.getLeaguePlayers({ leagueId: user.leagueId }),
		},
		{
			queryKey: "archetypes",
			queryFn: () => api.getArchetypes(),
		},
		{
			queryKey: "seasons",
			queryFn: () => api.getSeasons(),
		},
	]);

	const status = getQueriesStatus(queries);

	const { mutate: createEvent } = useMutation(api.createEvent, {
		onSuccess: () => {
			queryClient.invalidateQueries("events");
			navigate(`/dashboard/events/`);
		},
	});

	const [name, setName] = React.useState("");
	const [type, setType] = React.useState(eventTypes.REGULAR);
	const [date, setDate] = React.useState("");
	const [selectedPlayers, setSelectedPlayers] = React.useState([]);
	const [seasonId, setSeasonId] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	const [{ data: players }, { data: archetypes }, { data: seasons }] = queries;

	const isPlayerSelected = (id) => selectedPlayers.find((p) => p.id === id);

	const toggleSelection = (player) =>
		setSelectedPlayers(
			isPlayerSelected(player.id)
				? selectedPlayers.filter((p) => p.id !== player.id)
				: [...selectedPlayers, player]
		);

	const submit = async () => {
		console.log({
			date,
			name,
			selectedPlayers,
			archetypes,
			players,
			type,
			seasons,
			seasonId,
		});
		const errors = [];

		if (!date || (type === eventTypes.OFF_SEASON && !name)) errors.push("info");

		for (const selectedPlayer of selectedPlayers) {
			if (!selectedPlayer?.archetype || !selectedPlayer?.score) {
				errors.push("results");
				break;
			}
		}

		const results = selectedPlayers.map((selectedPlayer, idx) => ({
			playerId: selectedPlayer.id,
			archetypeId: selectedPlayer.archetype,
			score: parseInt(selectedPlayer.score),
			rank: idx,
		}));

		createEvent({
			type,
			name,
			date,
			results,
			seasonId,
			leagueId: user.leagueId,
		});
	};

	return (
		<CreateEventContext.Provider
			value={{
				date,
				name,
				selectedPlayers,
				archetypes,
				players,
				type,
				seasons,
				seasonId,
				setName,
				setDate,
				isPlayerSelected,
				setSelectedPlayers,
				toggleSelection,
				setType,
				setSeasonId,
			}}
		>
			<div>
				<div className="mb-4 flex justify-between">
					<Button onClick={() => navigate(-1)}>
						<CaretLeft size={14} />
						Indietro
					</Button>
					<Button className="px-8" onClick={submit} variant="dark">
						Crea evento
					</Button>
				</div>
				<div className="grid grid-cols-[368px_auto] gap-16">
					<div className="h-fit rounded-lg border border-gray-200 bg-gray-50 p-6">
						<GeneralInformation />
						<hr className="my-6" />
						<PartecipantsSelection />
					</div>
					<Results />
				</div>
			</div>
		</CreateEventContext.Provider>
	);
};

const GeneralInformation = () => {
	const { date, setDate, name, setName, seasons, setSeasonId, type, setType } =
		React.useContext(CreateEventContext);

	return (
		<div>
			<span className="mb-6 block text-base font-medium text-gray-600">
				Informazioni generali
			</span>
			<div className="mb-3">
				<span className="mb-1 block font-medium text-gray-600">Stagione</span>
				<Select
					value={setSeasonId}
					onChange={(e) => setSeasonId(e.target.value)}
					fullWidth
				>
					<option value="" disabled selected>
						Seleziona una season
					</option>
					{seasons.map((season) => (
						<option value={season.id}>
							{season.endsAt} {season.name}
						</option>
					))}
				</Select>
			</div>
			<div className="mb-3">
				<span className="mb-1 block font-medium text-gray-600">Tipo</span>
				<Select
					value={type}
					onChange={(e) => setType(e.target.value)}
					fullWidth
				>
					<option value={eventTypes.REGULAR}>Classificata</option>
					<option value={eventTypes.OFF_SEASON}>Non classificata</option>
				</Select>
			</div>

			{type === eventTypes.OFF_SEASON && (
				<div className="mb-3">
					<span className="mb-1 block font-medium text-gray-600">Nome</span>
					<Input
						placeholder="Nome dell'evento"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			)}

			<div className="mb-3">
				<span className="mb-1 block font-medium text-gray-600">Data</span>
				<Input
					type="date"
					placeholder="Data"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					fullWidth
				/>
			</div>
		</div>
	);
};

const PartecipantsSelection = () => {
	const { players, isPlayerSelected, toggleSelection } =
		React.useContext(CreateEventContext);

	const [query, setQuery] = React.useState("");

	const [showModal, setShowModal] = React.useState(false);

	const filteredPlayers = players.filter((player) => {
		return [
			player.firstName + " " + player.lastName,
			player.lastName + " " + player.firstName,
			player.username,
		].some((combination) =>
			combination
				.toLowerCase()
				.startsWith(query.trim().replace(/\s\s+/g, " ").toLowerCase())
		);
	});

	return (
		<>
			{showModal && <NewPlayerModal hideModal={() => setShowModal(false)} />}
			<span className="mb-6 block text-base font-medium text-gray-600">
				Selezione partecipanti
			</span>

			<Input
				className="mb-4"
				placeholder="Ricerca giocatore"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				searchIcon
			/>
			<div className="flex h-96 flex-col gap-2 overflow-auto">
				{filteredPlayers.length !== 0 ? (
					filteredPlayers.map((player) => (
						<div
							key={player.id}
							className={clsx(
								"flex cursor-pointer items-start justify-between rounded-lg border border-gray-200 p-4",
								isPlayerSelected(player.id) && "bg-white shadow-sm"
							)}
							onClick={() => {
								toggleSelection(player);
								setQuery("");
							}}
						>
							<div>
								<span className="block font-medium text-gray-600">
									{player.firstName} {player.lastName}
								</span>
								<span className="block text-xs text-gray-400">
									{player.username}
								</span>
							</div>
							<div
								className={clsx(
									"flex h-5 w-7 items-center justify-center rounded-md border border-gray-300",
									isPlayerSelected(player.id) &&
										"border-none bg-gray-600 text-white"
								)}
							>
								{isPlayerSelected(player.id) && <Check size={12} />}
							</div>
						</div>
					))
				) : (
					<div className="bg-white px-8 py-5 italic text-gray-400">
						Nessun giocatore trovato, se vuoi registrare un nuovo giocatore
						clicca{" "}
						<span
							className="cursor-pointer font-semibold text-gray-700 underline"
							onClick={() => setShowModal(true)}
						>
							qui
						</span>
					</div>
				)}
			</div>
		</>
	);
};

const Results = () => {
	const { selectedPlayers, setSelectedPlayers } =
		React.useContext(CreateEventContext);

	const setArchetype = (playerId, archetype) =>
		setSelectedPlayers(
			selectedPlayers.map((player) =>
				player.id === playerId ? { ...player, archetype } : player
			)
		);

	const setScore = (playerId, score) =>
		setSelectedPlayers(
			selectedPlayers.map((player) =>
				player.id === playerId ? { ...player, score } : player
			)
		);

	const deselectPlayer = (playerId) =>
		setSelectedPlayers(
			selectedPlayers.filter((player) => player.id !== playerId)
		);

	return (
		<div>
			<span className="mb-6 block text-base font-medium text-gray-600">
				Partecipanti ({selectedPlayers.length})
			</span>
			<div className="flex flex-col gap-y-2">
				{selectedPlayers.map((player) => (
					<div
						key={player.id}
						className="grid grid-cols-[auto_30%_96px_20px] items-center gap-4 rounded-lg border border-gray-200 p-4"
					>
						<div>
							<span className="block font-medium text-gray-600">
								{player.firstName} {player.lastName}
							</span>
							<span className="block text-xs text-gray-400">
								{player.username}
							</span>
						</div>
						<Archetype
							value={player.archetype}
							onChange={(archetype) => setArchetype(player.id, archetype)}
							// error={errors.includes("archetypeId")}
						/>
						<Score
							value={player.score}
							onChange={(score) => setScore(player.id, score)}
							// error={errors.includes("score")}
						/>
						<Menu deselect={() => deselectPlayer(player.id)} />
					</div>
				))}
			</div>
		</div>
	);
};

const Archetype = ({ onChange }) => {
	const { archetypes } = React.useContext(CreateEventContext);

	return (
		<Select
			onChange={(e) => {
				console.log(e.target.value);
				onChange(e.target.value);
			}}
			fullWidth
		>
			<option vlaue="" disabled selected>
				Seleziona un archetipo
			</option>
			{archetypes.map((archetype) => (
				<option value={archetype.id}>{archetype.name}</option>
			))}
		</Select>
	);
};

const Score = ({ value, onChange, error }) => {
	const handleChange = (e) => {
		const re = /^[0-9]*$/;

		if (e.target.value === "" || re.test(e.target.value)) {
			onChange(e.target.value);
		}
	};

	return (
		<Input
			placeholder="Punteggio"
			value={value || ""}
			onChange={handleChange}
			fullWidth
		/>
	);
};

const Menu = ({ deselect }) => {
	const menuRef = React.useRef(null);

	const [show, setShow] = React.useState(false);
	const toggleShow = () => setShow(!show);

	useClickOutside(menuRef, () => show && setShow(false));

	return (
		<div ref={menuRef} className="relative">
			<div
				className="relative z-0 cursor-pointer after:absolute after:top-1/2 after:left-1/2 after:-z-10 after:h-7 after:w-7 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full hover:after:bg-gray-200"
				onClick={toggleShow}
			>
				<DotsThree size={20} />
			</div>
			{show && (
				<div className="absolute top-2 right-2 flex flex-col gap-y-1 rounded-sm border border-gray-200 bg-white p-1 shadow-md">
					<div
						className="cursor-pointer rounded-sm px-3 py-2 text-red-500 hover:bg-red-50"
						onClick={deselect}
					>
						Deseleziona
					</div>
				</div>
			)}
		</div>
	);
};
