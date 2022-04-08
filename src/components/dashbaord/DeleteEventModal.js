import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

import * as api from "../../utils/familiarApi";

import * as Button from "../shared/Button";
import { Modal } from "../shared/Modal";

export const DeleteEventModal = ({ hideModal, eventId }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: deleteEvent } = useMutation(api.deleteEvent, {
		onSuccess: () => {
			queryClient.invalidateQueries("events");
			queryClient.removeQueries(["events", eventId]);
			navigate("/dashboard/events");
		},
	});

	const modalRef = React.useRef(null);

	useClickOutside(modalRef, hideModal);

	return (
		<Modal.Root onClickOutside={hideModal}>
			<Modal.Header>
				<Modal.Title>Elimina evento</Modal.Title>
				<Modal.Description>
					Sei sicuro di voler eliminare l'evento?
				</Modal.Description>
			</Modal.Header>
			<Modal.Footer>
				<Button.Red onClick={() => deleteEvent({ eventId })}>
					Elimina evento
				</Button.Red>
			</Modal.Footer>
		</Modal.Root>
	);
};
