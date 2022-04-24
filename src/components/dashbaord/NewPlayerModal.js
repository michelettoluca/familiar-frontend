import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useForm } from "../../utils/hooks/useForm";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import { Button } from "../shared/Button";
import * as Container from "../shared/Container";
import * as Divider from "../shared/Divider";
import { Input } from "../shared/Input";
import { Modal } from "../shared/Modal";

export const NewPlayerModal = ({ hideModal }) => {
	const queryClient = useQueryClient();
	const [error, setError] = React.useState("");

	const { user } = useSession();

	const { mutate: createPlayer } = useMutation(api.createPlayer, {
		onSuccess: () => {
			queryClient.invalidateQueries("players");
			hideModal();
		},
		onError: (err) => setError(err.response.data),
	});

	const [playerInfo, setPlayerInfo] = useForm({
		firstName: "",
		lastName: "",
		identifier: "",
	});

	const modalRef = React.useRef(null);

	useClickOutside(modalRef, hideModal);

	const handleRegisterPlayer = () => {
		const { firstName, lastName, identifier } = playerInfo;

		createPlayer({
			firstName,
			lastName,
			identifier,
			leagueId: user.leagueId,
		});
	};

	return (
		<Modal onClickOutside={hideModal}>
			<Container.Root>
				Registra giocatore Inserisci le informazioni del nuovo giocatore.
				<Divider.Horizontal />
				{error && error.msg}
				<Input
					placeholder="Nome"
					name="firstName"
					value={playerInfo.firstName}
					onChange={setPlayerInfo}
				/>
				<Input
					placeholder="Cognome"
					name="lastName"
					value={playerInfo.lastName}
					onChange={setPlayerInfo}
				/>
				<Button variant="dark" onClick={handleRegisterPlayer}>
					Aggiungi giocatore
				</Button>
			</Container.Root>
		</Modal>
	);
};
