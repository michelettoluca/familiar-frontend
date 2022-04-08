import React from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useModal } from "../../components/shared/Modal";

import * as api from "../../utils/familiarApi";

import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import * as Icon from "../../components/shared/Icons";
import { Heading1 } from "../../components/shared/Typography";

import { NewArchetypeModal } from "../../components/admin/NewArchtypeModal";

export const Archetypes = () => {
	const queryClient = useQueryClient();

	const { data: archetypes, status } = useQuery("archetypes", () =>
		api.getArchetypes()
	);

	const {
		isOpen: isModalOpen,
		open: openModal,
		close: closeModal,
	} = useModal();

	const { mutate: deleteArchetype } = useMutation(api.deleteArchetype, {
		onSuccess: () => queryClient.invalidateQueries("archetypes"),
	});

	const renderColors = (colors) => {
		return colors.map(
			(color) =>
				(color === "W" && <Icon.W key="W" />) ||
				(color === "U" && <Icon.U key="U" />) ||
				(color === "B" && <Icon.B key="B" />) ||
				(color === "R" && <Icon.R key="R" />) ||
				(color === "G" && <Icon.G key="G" />)
		);
	};

	if (status === "idle") return null;

	if (status === "loading") return <span>loading...</span>;

	if (status === "error") return <span>error</span>;

	return (
		<>
			{isModalOpen && <NewArchetypeModal close={closeModal} />}
			<div className="flex items-end justify-between">
				<Heading1>Archetipi</Heading1>
				<Button.Light onClick={openModal}>
					<Icon.Plus className="h-5 w-5" />
					Aggiungi archetipo
				</Button.Light>
			</div>
			<hr />
			<Container.Root>
				<div className="flex flex-col">
					{archetypes.length ? (
						archetypes.map((archetype) => (
							<div
								key={archetype.id}
								className="flex items-center justify-between px-8 py-5 border-b border-b-gray-200 bg-white last:border-b-0"
							>
								<div className="flex gap-1 items-baseline">
									{renderColors(archetype.colors)}
									<span className="font-medium">{archetype.name}</span>
									<span className="text-xs text-gray-400">
										({archetype.playstyle.toUpperCase()})
									</span>
								</div>
								<Menu
									deleteArchetype={() =>
										deleteArchetype({ archetypeId: archetype.id })
									}
								/>
							</div>
						))
					) : (
						<span className="text-gray-400 px-8 py-5">
							Nessun archtipo trovato
						</span>
					)}
				</div>
			</Container.Root>
		</>
	);
};

// const Options = [
// 	{
// 		label: "Label",
// 		callback: () => console.log("Pisello"),
// 		theme: "red",
// 	},
// ];

const Menu = ({ deleteArchetype }) => {
	const menuRef = React.useRef(null);

	const [show, setShow] = React.useState(false);
	const toggleShow = () => setShow(!show);

	useClickOutside(menuRef, () => show && setShow(false));

	return (
		<div ref={menuRef} className="relative">
			<div
				className="relative z-0 cursor-pointer after:absolute after:rounded-full after:-z-10 after:h-7 after:w-7 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 hover:after:bg-gray-200"
				onClick={toggleShow}
			>
				<Icon.MoreHorizontal className="h-5 w-5" />
			</div>
			{show && (
				<div className="absolute top-2 right-2 flex flex-col gap-y-1 p-1 bg-white rounded-sm border border-gray-200 shadow-md">
					<div
						className="px-3 py-2 rounded-sm text-red-500 cursor-pointer hover:bg-red-50"
						onClick={deleteArchetype}
					>
						Rimuovi
					</div>
				</div>
			)}
		</div>
	);
};
