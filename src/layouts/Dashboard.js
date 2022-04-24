import React from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { useSession } from "../contexts/SessionContext";

import * as api from "../utils/familiarApi";

import * as Main from "../components/shared/Main";
import * as Navbar from "../components/shared/Navbar";

export const Dashboard = () => {
	const { user, signOut } = useSession();

	const { data: league, status } = useQuery(
		["league", user.leagueId],
		() => api.getLeague({ leagueId: user.leagueId }),
		{ enabled: !!user.leagueId }
	);

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	return (
		<Main.Root>
			<Navbar.Root>
				<Navbar.Logo>{league.name}</Navbar.Logo>
				<Navbar.Item to="">Home</Navbar.Item>
				<Navbar.Item to="players">Giocatori</Navbar.Item>
				<Navbar.Item to="events">Eventi</Navbar.Item>
				<Navbar.Item to="/dashboard/sign-in" onClick={signOut} $signOut>
					Esci
				</Navbar.Item>
			</Navbar.Root>
			<Main.Content>
				<Outlet />
			</Main.Content>
		</Main.Root>
	);
};
