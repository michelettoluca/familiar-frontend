import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

import * as api from "../../utils/familiarApi";

import * as Button from "../shared/Button";
import { Modal } from "../shared/Modal";

export const DeletePlayerModal = ({ hideModal, player }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: deletePlayer } = useMutation(api.deletePlayer, {
		onSuccess: () => {
			queryClient.invalidateQueries("players");
			queryClient.removeQueries(["players", player.id]);
			navigate("/dashboard/players");
		},
	});

	const modalRef = React.useRef(null);

	useClickOutside(modalRef, hideModal);

	return (
		<Modal.Root onClickOutside={hideModal}>
			<Modal.Header>
				<Modal.Title>Rimuovi giocatore</Modal.Title>
			</Modal.Header>
			<Modal.Divider />
			<Modal.Content>
				<p>
					Sei sicuro di voler rimuovere{" "}
					<span className="font-medium text-gray-900">
						{player.firstName + " " + player.lastName}
					</span>
					?
				</p>
				<p>
					Tutti i suoi risultati appariranno come "Account eliminato", questa
					operazione è irreversibile.
				</p>
			</Modal.Content>
			<Modal.Footer>
				<span
					className="text-gray-400 font-medium hover:underline decoration-2 cursor-pointer"
					onClick={hideModal}
				>
					Annulla
				</span>
				<Button.Red onClick={() => deletePlayer({ playerId: player.id })}>
					Rimuovi
				</Button.Red>
			</Modal.Footer>
		</Modal.Root>
	);
};
