import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

import * as api from "../../utils/familiarApi";
import { formatDate } from "../../utils/formatDate";

import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import * as Icons from "../../components/shared/Icons";
import { Heading2 } from "../../components/shared/Typography";

import { NewSeasonModal } from "../../components/admin/NewSeasonModal";

export const Seasons = () => {
	const queryClient = useQueryClient();

	const { data: seasons, status } = useQuery("seasons", () => api.getSeasons());

	const [showModal, setShowModal] = React.useState(false);

	const { mutate: deleteSeason } = useMutation(api.deleteSeason, {
		onSuccess: () => queryClient.invalidateQueries("seasons"),
	});

	if (status === "idle") return null;

	if (status === "loading") return <span>loading...</span>;

	if (status === "error") return <span>error</span>;

	console.log(seasons);

	return (
		<>
			{showModal && <NewSeasonModal hideModal={() => setShowModal(false)} />}
			<div className="flex items-end justify-between">
				<Heading2>Stagioni</Heading2>
				<Button.Light onClick={() => setShowModal(true)}>
					<Icons.Plus className="h-5 w-5" />
					Aggiungi stagione
				</Button.Light>
			</div>
			<hr />
			<Container.Root>
				<div className="flex flex-col">
					{seasons.length ? (
						seasons.map((season) => (
							<div
								key={season.id}
								className="flex items-center justify-between px-8 py-5 border-b border-b-gray-200 bg-white last:border-b-0"
							>
								<div className="flex flex-col gap-1">
									<span className="font-medium">{season.name}</span>
									<div className="flex text-gray-400 gap-x-1">
										<Icons.Calendar className="h-5 w-5" />
										{formatDate(season.beginsAt)}
									</div>
								</div>
								<Menu
									deleteSeason={() => deleteSeason({ seasonId: season.id })}
								/>
							</div>
						))
					) : (
						<span className="text-gray-400 px-8 py-5">
							Nessuna stagione trovata
						</span>
					)}
				</div>
			</Container.Root>
		</>
	);
};

const Menu = ({ deleteSeason }) => {
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
				<Icons.MoreHorizontal className="h-5 w-5" />
			</div>
			{show && (
				<div className="absolute top-2 right-2 flex flex-col gap-y-1 p-1 bg-white rounded-sm border border-gray-200 shadow-md">
					<div
						className="px-3 py-2 rounded-sm text-red-500 cursor-pointer hover:bg-red-50"
						onClick={deleteSeason}
					>
						Rimuovi
					</div>
				</div>
			)}
		</div>
	);
};
