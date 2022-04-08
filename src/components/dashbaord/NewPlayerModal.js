import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useForm } from "../../utils/hooks/useForm";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import * as Button from "../shared/Button";
import * as Input from "../shared/Input";
import { Modal } from "../shared/Modal";

export const NewPlayerModal = ({ hideModal }) => {
	const queryClient = useQueryClient();
	const [error, setError] = React.useState("");

	const { user } = useSession();

	const { mutateAsync: createPlayer } = useMutation(api.createPlayer, {
		onSuccess: () => queryClient.invalidateQueries("players"),
		onError: (err) => setError(err.response.data),
	});

	const [playerInfo, setPlayerInfo] = useForm({
		firstName: "",
		lastName: "",
		identifier: "",
	});

	const modalRef = React.useRef(null);

	useClickOutside(modalRef, hideModal);

	const handleRegisterPlayer = async () => {
		const { firstName, lastName, identifier } = playerInfo;

		await createPlayer({
			firstName,
			lastName,
			identifier,
			leagueId: user.leagueId,
		});

		hideModal();
	};

	return (
		<Modal.Root onClickOutside={hideModal}>
			<Modal.Header>
				<Modal.Title>Registra giocatore</Modal.Title>
				<Modal.Description>
					Inserisci le informazioni del nuovo giocatore.
				</Modal.Description>
			</Modal.Header>
			<Modal.Divider />
			<Modal.Content className="flex flex-col gap-y-2">
				{error && error.msg}
				<Input.Text
					placeholder="Nome"
					value={playerInfo.firstName}
					name="firstName"
					onChange={setPlayerInfo}
				/>
				<Input.Text
					placeholder="Cognome"
					value={playerInfo.lastName}
					name="lastName"
					onChange={setPlayerInfo}
				/>
				<Input.Text
					placeholder="Identificativo"
					value={playerInfo.identifier}
					name="identifier"
					onChange={setPlayerInfo}
				/>
			</Modal.Content>
			<Modal.Footer>
				<Button.Dark onClick={handleRegisterPlayer}>
					Aggiungi giocatore
				</Button.Dark>
			</Modal.Footer>
		</Modal.Root>
	);
};
