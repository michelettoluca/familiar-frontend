import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

import * as api from "../../utils/familiarApi";

import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { Modal } from "../shared/Modal";

export const NewLeagueModal = ({ hideModal }) => {
	const queryClient = useQueryClient();

	const { mutate: createLeague } = useMutation(api.createLeague, {
		onSuccess: () => {
			queryClient.invalidateQueries("leagues");
			hideModal();
		},
	});

	const [name, setName] = React.useState("");
	const [tag, setTag] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	const modalRef = React.useRef(null);

	useClickOutside(modalRef, hideModal);

	const handleCreateLeague = () => {
		if (password !== confirmPassword) return null;

		createLeague({ name, tag, password });
	};

	return (
		<Modal.Root onClickOutside={hideModal}>
			<Modal.Header>
				<Modal.Title>Aggiungi lega</Modal.Title>
				<Modal.Description>
					Inserisci le informazioni della nuova lega
				</Modal.Description>
			</Modal.Header>
			<Modal.Divider />
			<Modal.Content className="flex flex-col gap-y-2">
				<Input
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="Tag"
					value={tag}
					onChange={(e) => setTag(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Confirm password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</Modal.Content>
			<Modal.Footer>
				<Button variant="dark" onClick={handleCreateLeague}>
					Aggiungi lega
				</Button>
			</Modal.Footer>
		</Modal.Root>
	);
};
