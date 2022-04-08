import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

import * as api from "../../utils/familiarApi";

import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import * as Icon from "../../components/shared/Icons";
import { Heading1 } from "../../components/shared/Typography";

import { NewLeagueModal } from "../../components/admin/NewLeagueModal";

export const Leagues = () => {
	const queryClient = useQueryClient();

	const { data: leagues, status } = useQuery("leagues", () => api.getLeagues());

	const [showModal, setShowModal] = React.useState(false);

	const { mutate: deleteLeague } = useMutation(api.deleteLeague, {
		onSuccess: () => queryClient.invalidateQueries("leagues"),
	});

	if (status === "idle") return null;

	if (status === "loading") return <span>loading...</span>;

	if (status === "error") return <span>error</span>;

	return (
		<>
			{showModal && <NewLeagueModal hideModal={() => setShowModal(false)} />}
			<div className="flex items-end justify-between">
				<Heading1>Leghe</Heading1>
				<Button.Light
					iconBefore={<Icon.Plus className="h-5 w-5" />}
					onClick={() => setShowModal(true)}
				>
					Aggiungi lega
				</Button.Light>
			</div>
			<hr />
			<Container.Root>
				<div className="flex flex-col">
					{leagues.length ? (
						leagues.map((league) => (
							<div
								key={league.id}
								className="flex items-center justify-between px-8 py-5 border-b border-b-gray-200 bg-white last:border-b-0"
							>
								<span>
									<span className="font-medium">{league.name}</span> (
									{league.tag})
								</span>
								<Menu
									deleteLeague={() => deleteLeague({ leagueId: league.id })}
								/>
							</div>
						))
					) : (
						<span className="text-gray-400 px-8 py-5">
							Nessuna lega trovata
						</span>
					)}
				</div>
			</Container.Root>
		</>
	);
};

const Menu = ({ deleteLeague }) => {
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
						onClick={deleteLeague}
					>
						Rimuovi
					</div>
				</div>
			)}
		</div>
	);
};
