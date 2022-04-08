import classNames from "classnames";

import React from "react";
import { useMutation, useQueryClient } from "react-query";

import * as api from "../../utils/familiarApi";
import { playstyles } from "../../utils/constants";

import * as Button from "../shared/Button";
import * as Input from "../shared/Input";
import * as Icon from "../shared/Icons";
import { Select } from "../shared/Select";
import { Modal } from "../shared/Modal";

export const NewArchetypeModal = ({ close }) => {
	// console.log("asd", ColorSvg);
	const queryClient = useQueryClient();

	const { mutate: createArchetype } = useMutation(api.createArchetype, {
		onSuccess: () => {
			queryClient.invalidateQueries("archetypes");
			close();
		},
	});

	const [name, setName] = React.useState("");
	const [playstyle, setPlaystyle] = React.useState(playstyles.AGGRO);
	const [colors, setColros] = React.useState([]);

	const isColorSelected = (color) => colors.includes(color);

	const toggleColorSelection = (color) =>
		setColros(
			isColorSelected(color)
				? colors.filter((c) => c !== color)
				: [...colors, color]
		);

	const colorClass = "h-5 w-5 cursor-pointer";

	const colorOptions = ["W", "U", "B", "R", "G"];

	return (
		<Modal onClickOutside={close}>
			<div>
				<div>
					<h1>Aggiungi archetipo</h1>
					<p>Inserisci le informazioni del nuovo archetipo</p>
				</div>
				<hr />
				<div>
					<Input.Text
						placeholder="Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Select
						placeholder="Playstyle"
						value={playstyle}
						onChange={(e) => setPlaystyle(e.target.value)}
					>
						<option value={playstyles.AGGRO}>Aggro</option>
						<option value={playstyles.CONTROL}>Control</option>
						<option value={playstyles.TEMPO}>Tempo</option>
						<option value={playstyles.COMBO}>Combo</option>
						<option value={playstyles.MIDRANGE}>Midrange</option>
						<option value={playstyles.PRISON}>Prison</option>
					</Select>
					<div className="flex justify-between py-2 px-3 rounded-sm border border-gray-300">
						<span>Colori</span>
						<div className="flex gap-3">
							<Icon.W
								className={classNames(colorClass, {
									"grayscale opacity-50": !isColorSelected("W"),
								})}
								onClick={() => toggleColorSelection("W")}
							/>
							<Icon.U
								className={classNames(colorClass, {
									"grayscale opacity-50": !isColorSelected("U"),
								})}
								onClick={() => toggleColorSelection("U")}
							/>
							<Icon.B
								className={classNames(colorClass, {
									"grayscale opacity-50": !isColorSelected("B"),
								})}
								onClick={() => toggleColorSelection("B")}
							/>
							<Icon.R
								className={classNames(colorClass, {
									"grayscale opacity-50": !isColorSelected("R"),
								})}
								onClick={() => toggleColorSelection("R")}
							/>
							<Icon.G
								className={classNames(colorClass, {
									"grayscale opacity-50": !isColorSelected("G"),
								})}
								onClick={() => toggleColorSelection("G")}
							/>
						</div>
					</div>
				</div>
				<div>
					<Button.Dark
						onClick={() => createArchetype({ name, playstyle, colors })}
					>
						Aggiungi archetipo
					</Button.Dark>
				</div>
			</div>
		</Modal>
	);
};
