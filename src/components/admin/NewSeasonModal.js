import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

import * as api from "../../utils/familiarApi";

import * as Button from "../shared/Button";
import * as Input from "../shared/Input";
import { Modal } from "../shared/Modal";

export const NewSeasonModal = ({ hideModal }) => {
	const queryClient = useQueryClient();

	const { mutate: createSeason } = useMutation(api.createSeason, {
		onSuccess: () => {
			queryClient.invalidateQueries("seasons");
			hideModal();
		},
	});

	const [name, setName] = React.useState("");
	const [beginsAt, setBeginsAt] = React.useState("");

	const modalRef = React.useRef(null);

	useClickOutside(modalRef, hideModal);

	const handleSubmit = () => createSeason({ name, beginsAt });

	return (
		<Modal.Root onClickOutside={hideModal}>
			<Modal.Header>
				<Modal.Title>Aggiungi stagione</Modal.Title>
				<Modal.Description>
					Inserisci le informazioni della nuova stagione
				</Modal.Description>
			</Modal.Header>
			<Modal.Divider />
			<Modal.Content className="flex flex-col gap-y-2">
				<Input.Text
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input.Date
					placeholder="Data di inizio"
					type="date"
					value={beginsAt}
					onChange={(e) => setBeginsAt(e.target.value)}
				/>
			</Modal.Content>
			<Modal.Footer>
				<Button.Dark onClick={handleSubmit}>Aggiungi stagione</Button.Dark>
			</Modal.Footer>
		</Modal.Root>
	);
};
