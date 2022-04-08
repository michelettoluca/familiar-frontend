import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const formatDate = date =>
	capitalizeFirstLetter(
		new Date(date.split("T")[0]).toLocaleString("it-IT", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		})
	);
