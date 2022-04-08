import classNames from "classnames";

import React from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { usePaginate } from "../../utils/hooks/usePaginate";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";
import { getQueriesStatus } from "../../utils/getQueriesStatus";

import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import * as Icon from "../../components/shared/Icons";
import * as Input from "../../components/shared/Input";
import { Heading1, Heading2 } from "../../components/shared/Typography";
import { Select } from "../../components/shared/Select";

import { NewPlayerModal } from "../../components/dashbaord/NewPlayerModal";

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
	]);

	const status = getQueriesStatus(queries);

	const { mutate: createEvent } = useMutation(api.createEvent, {
		onSuccess: () => {
			queryClient.invalidateQueries("events");
			navigate(`/dashboard/events/`);
		},
	});

	const [name, setName] = React.useState("");
	const [type, setType] = React.useState("regular");
	const [date, setDate] = React.useState("");
	const [selectedPlayers, setSelectedPlayers] = React.useState([]);
	const [errorMessage, setErrorMessage] = React.useState("");

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	const [{ data: players }, { data: archetypes }] = queries;

	const isPlayerSelected = (id) => selectedPlayers.find((p) => p.id === id);

	const toggleSelection = (player) =>
		setSelectedPlayers(
			isPlayerSelected(player.id)
				? selectedPlayers.filter((p) => p.id !== player.id)
				: [...selectedPlayers, player]
		);

	const submit = async () => {
		const errors = [];

		if (!date || (type === "off_season" && !name)) errors.push("info");

		for (const selectedPlayer of selectedPlayers) {
			if (!selectedPlayer?.archetype || !selectedPlayer?.score) {
				errors.push("results");
				break;
			}
		}

		let _errorMessage = "Compila i campi in ";
		if (errors.includes("info")) _errorMessage += "`Informazioni generali`";
		if (errors.length === 2) _errorMessage += " e ";
		if (errors.includes("results")) _errorMessage += "`Risultati`";
		if (errors.length !== 0) return setErrorMessage(_errorMessage);
		setErrorMessage("");

		const results = selectedPlayers.map((selectedPlayer) => ({
			playerId: selectedPlayer.id,
			archetypeId: selectedPlayer.archetype.id,
			score: parseInt(selectedPlayer.score),
		}));

		createEvent({
			type,
			name,
			date,
			results,
			leagueId: user.leagueId,
		});
	};

	const contextValue = {
		date,
		setDate,
		name,
		setName,
		selectedPlayers,
		setSelectedPlayers,
		isPlayerSelected,
		toggleSelection,
		archetypes,
		players,
		type,
		setType,
	};

	return (
		<CreateEventContext.Provider value={contextValue}>
			<div className="flex flex-col gap-y-2">
				<Button.Light onClick={() => navigate(-1)}>
					<Icon.ChevronUp className="-rotate-90 " />
					Indietro
				</Button.Light>
				<Heading1 className="mt-4">Nuovo evento</Heading1>
			</div>
			<hr />
			<Info />
			<PlayerSelection />
			<Results />
			<div className="flex items-center gap-4 self-end">
				{errorMessage && (
					<div className="flex gap-2 py-2 px-3 bg-red-500 text-white border border-transparent rounded-sm">
						<Icon.Danger className="h-5 w-5" />
						{errorMessage}
					</div>
				)}
				<Button.Light onClick={submit}>Crea evento</Button.Light>
			</div>
		</CreateEventContext.Provider>
	);
};

const Info = () => {
	const { date, setDate, name, setName, type, setType } =
		React.useContext(CreateEventContext);

	return (
		<div className="flex flex-col gap-y-4">
			<Heading2>Informazioni generali</Heading2>
			<Container.Root className="p-8 gap-4">
				<div className="grid grid-cols-[30%_auto] items-start gap-x-4">
					<div className="flex items-center gap-x-2">
						<Icon.Hashtag className="h-5 w-5" />
						<span className="font-medium">Tipo</span>
					</div>
					<Select value={type} onChange={(e) => setType(e.target.value)}>
						<option value="regular">Tappa regolare</option>
						<option value="off_season">Evento one shot</option>
					</Select>
				</div>

				{type === "off_season" && (
					<div className="grid grid-cols-[30%_auto] items-start gap-x-4">
						<div className="flex items-center gap-x-2">
							<Icon.Tag className="h-5 w-5" />
							<span className="font-medium">Nome</span>
						</div>
						<Input.Text
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Nome"
						/>
					</div>
				)}

				<div className="grid grid-cols-[30%_auto] items-start gap-x-4">
					<div className="flex items-center gap-x-2">
						<Icon.Calendar className="h-5 w-5" />
						<span className="font-medium">Data</span>
					</div>
					<Input.Date
						value={date}
						onChange={(e) => setDate(e.target.value)}
						placeholder="Data"
						fullWidth
					/>
				</div>
			</Container.Root>
		</div>
	);
};

const PlayerSelection = () => {
	const { players, isPlayerSelected, toggleSelection } =
		React.useContext(CreateEventContext);

	const [serachValue, setSearchValue] = React.useState("");

	const [showModal, setShowModal] = React.useState(false);

	const filteredPlayers = players.filter((player) => {
		const combinations = [
			player.firstName + " " + player.lastName,
			player.lastName + " " + player.firstName,
			player.identifier,
		];

		return combinations.some((combination) =>
			combination
				.toLowerCase()
				.startsWith(serachValue.trim().replace(/\s\s+/g, " ").toLowerCase())
		);
	});

	const { currentPage, currentPageNumber, setCurrentPageNumber, pageCount } =
		usePaginate({
			pageSize: 10,
			array: filteredPlayers,
		});

	const pageIndexes = [...Array(pageCount).keys()];

	return (
		<>
			{showModal && <NewPlayerModal hideModal={() => setShowModal(false)} />}
			<div className="flex flex-col gap-y-4">
				<div className="flex items-end justify-between">
					<Heading2>Selezione giocatori</Heading2>
					<div className="relative">
						<Input.Text
							value={serachValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Nome giocatore"
						/>
						{serachValue ? (
							<div
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 z-0 cursor-pointer after:absolute after:content-[''] after:h-7 after:w-7 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 hover:after:bg-gray-100 after:-z-10"
								onClick={() => setSearchValue("")}
							>
								<Icon.Close className="h-5 w-5" />
							</div>
						) : (
							<div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
								<Icon.Search className="h-5 w-5" />
							</div>
						)}
					</div>
				</div>
				<Container.Root>
					{currentPage.length !== 0 ? (
						currentPage.map((player) => (
							<div
								key={player.id}
								className={classNames(
									"flex items-center justify-between px-8 py-5 border-b border-b-gray-200 cursor-pointer last:border-b-0",
									{
										"bg-gray-100": isPlayerSelected(player.id),
										"hover:bg-gray-50": !isPlayerSelected(player.id),
									}
								)}
								onClick={() => toggleSelection(player)}
							>
								<div>
									{player.firstName} {player.lastName}{" "}
									<span className="text-xs text-gray-400">
										({player.identifier})
									</span>
								</div>
								<Icon.Checkbox
									className="h-5 w-5"
									checked={isPlayerSelected(player.id)}
								/>
							</div>
						))
					) : (
						<div className="px-8 py-5 text-gray-400 bg-white italic">
							Nessun giocatore trovato, se vuoi registrare un nuovo giocatore
							clicca{" "}
							<span
								className="underline font-semibold text-gray-700 cursor-pointer"
								onClick={() => setShowModal(true)}
							>
								qui
							</span>
						</div>
					)}
				</Container.Root>
				{pageCount > 1 && (
					<div className="flex items-center justify-center gap-x-2">
						{pageIndexes.map((pageIndex) => (
							<div
								key={pageIndex}
								className={classNames(
									"flex items-center justify-center h-7 w-7 rounded-full cursor-pointer",
									{
										"text-gray-700 bg-gray-100 border border-gray-200":
											currentPageNumber === pageIndex,
										"text-gray-400 hover:bg-gray-100":
											currentPageNumber !== pageIndex,
									}
								)}
								onClick={() => setCurrentPageNumber(pageIndex)}
							>
								{pageIndex + 1}
							</div>
						))}
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
		<div className="flex flex-col gap-y-4">
			<Heading2>Inserimento risultati</Heading2>
			<Container.Root>
				{selectedPlayers.length !== 0 ? (
					selectedPlayers.map((player) => (
						<div
							key={player.id}
							className="grid grid-cols-[auto_25%_25%_20px] grid-rows-[59px] gap-4 items-center px-8 border-b border-b-gray-200 last:border-b-0"
						>
							<div className="flex items-center gap-x-3">
								<div>
									{player.firstName} {player.lastName}{" "}
									<span className="text-xs text-gray-400">
										({player.identifier})
									</span>
								</div>
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
					))
				) : (
					<div className="grid grid-rows-[59px] items-center px-8 text-gray-400 bg-white italic">
						Nessun giocatore selzionato
					</div>
				)}
			</Container.Root>
		</div>
	);
};

const Archetype = ({ value, onChange, error }) => {
	const { archetypes } = React.useContext(CreateEventContext);

	const dropdownRef = React.useRef(null);

	const [show, setShow] = React.useState(false);

	const toggleShow = () => {
		setSearchValue("");
		setShow(!show);
	};

	const [searchValue, setSearchValue] = React.useState("");

	const sortedArchetypes = archetypes.sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	const filteredArchetypes = sortedArchetypes.filter((a) =>
		a.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	useClickOutside(dropdownRef, () => {
		if (show) {
			setSearchValue("");
			setShow(false);
		}
	});

	const handleArchetypeChange = (archetype) => {
		onChange(archetype);
		setShow(false);
	};

	const archetypeClass = classNames(
		"relative bg-white border border-gray-300 rounded-sm outline-2",
		{
			"outline self-start z-10 translate-y-[11px]": show === true,
			"outline outline-red-500": error && !value,
		}
	);

	const chevronUpClass = classNames(
		"absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400",
		{
			"rotate-180": !show,
		}
	);

	return (
		<div ref={dropdownRef} className={archetypeClass}>
			<div onClick={toggleShow} className="relative px-4 py-2 cursor-pointer">
				{value ? value.name : <span className="text-gray-400">Archetipo</span>}
				<Icon.ChevronUp className={chevronUpClass} />
			</div>
			{show && (
				<>
					<div className="relative border-y border-y-gray-200 bg-gray-50">
						<Input.Text
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Nome archetipo"
							autoFocus
						/>
						<Icon.Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
					</div>
					<div className="max-h-[180px] overflow-y-auto cursor-pointer">
						{filteredArchetypes.length !== 0 ? (
							filteredArchetypes.map((archetype) => (
								<div
									key={archetype.id}
									className="px-4 py-2 hover:bg-gray-100"
									onClick={() => handleArchetypeChange(archetype)}
								>
									{archetype.name}
								</div>
							))
						) : (
							<div className="px-4 py-2 text-gray-400 bg-white italic">
								Nessun archetipo trovato
							</div>
						)}
					</div>
				</>
			)}
		</div>
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
		<Input.Text
			value={value || ""}
			onChange={handleChange}
			placeholder="Punteggio"
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
				className="relative z-0 cursor-pointer after:absolute after:rounded-full after:-z-10 after:h-7 after:w-7 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 hover:after:bg-gray-200"
				onClick={toggleShow}
			>
				<Icon.MoreHorizontal className="h-5 w-5" />
			</div>
			{show && (
				<div className="absolute top-2 right-2 flex flex-col gap-y-1 p-1 bg-white rounded-sm border border-gray-200 shadow-md">
					<div
						className="px-3 py-2 rounded-sm text-red-500 cursor-pointer hover:bg-red-50"
						onClick={deselect}
					>
						Deseleziona
					</div>
				</div>
			)}
		</div>
	);
};
