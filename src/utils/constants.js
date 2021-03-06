export const role = {
	ADMIN: "ADMIN",
	ORGANIZER: "ORGANIZER",
};

export const eventTypes = {
	REGULAR: "regular",
	OFF_SEASON: "off_season",
};

export const colors = {
	WHITE: "W",
	BLUE: "U",
	BLACK: "B",
	RED: "R",
	GREEN: "G",
};

export const playstyles = {
	AGGRO: "aggro",
	CONTROL: "control",
	COMBO: "combo",
	TEMPO: "tempo",
	MIDRANGE: "midrange",
	PRISON: "prison",
};

export const screenSize = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
	laptopL: "1440px",
	desktop: "2560px",
};

const eventType = {
	REGULAR: "REGULAR",
	OFF_SEASON: "OFF_SEASON",
};

const color = {
	WHITE: "W",
	BLUE: "U",
	BLACK: "B",
	RED: "R",
	GREEN: "G",
};

const playstyle = {
	AGGRO: "AGGRO",
	CONTROL: "CONTROL",
	COMBO: "COMBO",
	TEMPO: "TEMPO",
	MIDRANGE: "MIDRANGE",
	PRISON: "PRISON",
};

const errorCode = {
	// Server
	SERVER_ERROR: "SERVER_ERROR",

	// Authentication
	INVALID_USERNAME: "INVALID_USERNAME",
	INVALID_PASSWORD: "INVALID_PASSWORD",
	INVALID_ROLE: "INVALID_ROLE",
	INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",

	INCORRECT_PASSWORD: "INCORRECT_PASSWORD",

	// Player
	INVALID_PLAYER_UUID: "INVALID_PLAYER_UUID",
	INVALID_PLAYER_FIRSTNAME: "INVALID_PLAYER_FIRSTNAME",
	INVALID_PLAYER_LASTNAME: "INVALID_PLAYER_LASTNAME",

	PLAYER_USERNAME_TAKEN: "PLAYER_USERNAME_TAKEN",
	PLAYER_NOT_FOUND: "PLAYER_NOT_FOUND",

	// Archetype
	INVALID_ARCHETYPE_UUID: "INVALID_ARCHETYPE_UUID",
	INVALID_ARCHETYPE_NAME: "INVALID_ARCHETYPE_NAME",
	INVALID_ARCHETYPE_COLORS: "INVALID_ARCHETYPE_COLORS",
	INVALID_ARCHETYPE_PLAYSTYLE: "INVALID_ARCHETYPE_PLAYSTYLE",

	ARCHETYPE_NOT_FOUND: "ARCHETYPE_NOT_FOUND",
	ARCHETYPE_NAME_TAKEN: "ARCHETYPE_NAME_TAKEN",

	// League
	INVALID_LEAGUE_UUID: "INVALID_LEAGUE_UUID",
	INVALID_LEAGUE_NAME: "INVALID_LEAGUE_NAME",
	INVALID_LEAGUE_TAG: "INVALID_LEAGUE_TAG",
	INVALID_LEAGUE_PASSWORD: "INVALID_LEAGUE_PASSWORD",

	LEAGUE_TAG_TAKEN: "LEAGUE_TAG_TAKEN",
	LEAGUE_NOT_FOUND: "LEAGUE_NOT_FOUND",

	// Season
	INVALID_SEASON_UUID: "INVALID_SEASON_UUID",
	INVALID_SEASON_NAME: "INVALID_SEASON_NAME",
	INVALID_SEASON_ENDSAT: "INVALID_SEASON_ENDSAT",

	SEASON_NOT_FOUND: "SEASON_NOT_FOUND",

	// Event
	INVALID_EVENT_UUID: "INVALID_EVENT_UUID",
	INVALID_EVENT_TYPE: "INVALID_EVENT_TYPE",
	INVALID_EVENT_NAME: "INVALID_EVENT_NAME",
	INVALID_EVENT_DATE: "INVALID_EVENT_DATE",

	EVENT_NOT_FOUND: "EVENT_NOT_FOUND",

	// Result
	INVALID_RESULT_UUID: "INVALID_RESULT_UUID",
	INVALID_RESULT_SCORE: "INVALID_RESULT_SCORE",
	INVALID_RESULT_RANK: "INVALID_RESULT_RANK",

	NOT_ENOUGH_RESULTS: "NOT_ENOUGH_RESULTS",
	RESULT_NOT_FOUND: "RESULT_NOT_FOUND",
};
