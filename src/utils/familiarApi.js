import Axios from "axios";

// const baseURL = "http://18.197.8.167:4000/";
const baseURL = "http://localhost:4000/api";

export const PrivateClient = Axios.create({ baseURL });
export const PublicClient = Axios.create({ baseURL });

PrivateClient.interceptors.request.use(async (config) => {
	const accessToken = await refreshToken();

	if (accessToken) config.headers.Authorization = "Bearer " + accessToken;

	return config;
});

export const refreshToken = async () => {
	const { data: accessToken } = await PublicClient.get("/auth/refresh-token", {
		withCredentials: true,
	});

	return accessToken;
};

export const signIn = async ({ username, password }) => {
	const { data } = await PublicClient.post(
		"/auth/sign-in",
		{ username, password },
		{ withCredentials: true }
	);

	return data;
};

export const signOut = async () => {
	const { data } = await PrivateClient.delete("/auth/sign-out", {
		withCredentials: true,
	});

	return data;
};

export const getArchetypes = async () => {
	const { data } = await PublicClient.get("/archetypes");

	return data;
};

export const getArchetype = async ({ archetypeId }) => {
	const { data } = await PublicClient.get(`/archetypes/${archetypeId}`);

	return data;
};

export const createArchetype = async ({ name, playstyle, colors }) => {
	const { data } = await PrivateClient.post(
		"/archetypes",
		{
			name,
			playstyle,
			colors,
		},
		{ withCredentials: true }
	);

	return data;
};

export const deleteArchetype = async ({ archetypeId }) => {
	const { data } = await PrivateClient.delete(`/archetypes/${archetypeId}`);

	return data;
};

export const getSeasons = async () => {
	const { data } = await PublicClient.get("/seasons");

	return data;
};

export const getSeason = async ({ seasonId }) => {
	const { data } = await PublicClient.get(`/seasons/${seasonId}`);

	return data;
};

export const createSeason = async ({ name, beginsAt }) => {
	const { data } = await PrivateClient.post(
		"/seasons",
		{
			name,
			beginsAt,
		},
		{ withCredentials: true }
	);

	return data;
};

export const deleteSeason = async ({ seasonId }) => {
	const { data } = await PrivateClient.delete(`/seasons/${seasonId}`);

	return data;
};

export const createLeague = async ({ name, tag, password }) => {
	const { data } = await PrivateClient.post(
		"/leagues",
		{
			name,
			tag,
			password,
		},
		{ withCredentials: true }
	);

	return data;
};

export const deleteLeague = async ({ leagueId }) => {
	const { data } = await PrivateClient.delete(`/leagues/${leagueId}`, {
		withCredentials: true,
	});

	return data;
};

export const getLeagues = async () => {
	const { data } = await PublicClient.get(`/leagues`);

	return data;
};

export const getLeague = async ({ leagueId }) => {
	const { data } = await PublicClient.get(`/leagues/${leagueId}`);

	return data;
};

export const getLeagueEvents = async ({ leagueId }) => {
	const { data } = await PublicClient.get(`/leagues/${leagueId}/events`);

	return data;
};

export const getLeagueLeaderboard = async ({ leagueId }) => {
	const { data } = await PublicClient.get(`/leagues/${leagueId}/leaderboard`);

	return data;
};

export const getLeaguePlayers = async ({ leagueId }) => {
	const { data } = await PublicClient.get(`/leagues/${leagueId}/players`);

	return data;
};

export const createEvent = async ({ type, name, date, results, leagueId }) => {
	const { data } = await PrivateClient.post(`/events`, {
		type,
		name,
		date,
		results,
		leagueId,
	});

	return data;
};

export const deleteEvent = async ({ eventId }) => {
	const { data } = await PrivateClient.delete(`/events/${eventId}`);

	return data;
};

export const getEvent = async ({ eventId }) => {
	const { data } = await PublicClient.get(`/events/${eventId}`);

	return data;
};

export const getPlayer = async ({ playerId }) => {
	const { data } = await PublicClient.get(`/players/${playerId}`);

	return data;
};

export const deletePlayer = async ({ playerId }) => {
	const { data } = await PrivateClient.delete(`/players/${playerId}`);

	return data;
};

export const createPlayer = async ({
	firstName,
	lastName,
	identifier,
	leagueId,
}) => {
	const { data } = await PrivateClient.post(
		`/players`,
		{
			firstName,
			lastName,
			identifier,
			leagueId,
		},
		{ withCredentials: true }
	);

	return data;
};

export const getPlayerEvents = async ({ playerId }) => {
	const { data } = await PublicClient.get(`/players/${playerId}/events`);

	return data;
};
