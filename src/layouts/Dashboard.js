import React from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../contexts/SessionContext";

import * as api from "../utils/familiarApi";

import * as Main from "../components/shared/Main";
import * as Icon from "../components/shared/Icons";
import * as Navbar from "../components/shared/Navbar";

export const Dashboard = () => {
	const { user, signOut } = useSession();

	const { data: league, status } = useQuery(
		["league", user.leagueId],
		() => api.getLeague({ leagueId: user.leagueId }),
		{ enabled: !!user.leagueId }
	);

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<Main.Root>
			<Navbar.Root>
				<Navbar.Logo domain={league.tag} />
				<Navbar.Item to="" icon={<Icon.Overview />}>
					Home
				</Navbar.Item>
				<Navbar.Item to="players" icon={<Icon.UserList />}>
					Giocatori
				</Navbar.Item>
				<Navbar.Item to="events" icon={<Icon.ListTree />}>
					Eventi
				</Navbar.Item>
				<Navbar.Item
					to="/dashboard/sign-in"
					onClick={() => signOut()}
					icon={<Icon.LogOut />}
				>
					<span className="hidden lg:block">Disconnettiti</span>
				</Navbar.Item>
			</Navbar.Root>
			<Main.Content>
				<Outlet />
			</Main.Content>
		</Main.Root>
	);
};
