import React from "react";

import * as Input from "../../components/shared/Input";
import { Select } from "../../components/shared/Select";
import { Heading1 } from "../../components/shared/Typography";

export const Home = () => {
	return (
		<div className="flex flex-col w-96">
			<Heading1>Asd</Heading1>
			<Select fullWidth>
				<option>Lega Pauper Milano</option>
				<option>Lega Pauper Brescia</option>
				<option>Lega Pauper Lecco</option>
			</Select>
			<Input.Date fullWidth />
		</div>
	);
};
