import React from "react";
import { Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

import * as Main from "../components/shared/Main";
import * as Navbar from "../components/shared/Navbar";
import * as Icon from "../components/shared/Icons";

export const Admin = () => {
	const { signOut } = useSession();

	return (
		<Main.Root>
			<Navbar.Root>
				<Navbar.Logo>
					<span className="font-['Poppins'] text-2xl font-semibold text-gray-900 lg:after:content-['Familiar.'] after:content-['F.']" />
				</Navbar.Logo>
				<Navbar.Item to="" icon={<Icon.Overview />}>
					Home
				</Navbar.Item>
				<Navbar.Item to="leagues" icon={<Icon.Organisation />}>
					Leghe
				</Navbar.Item>
				<Navbar.Item to="archetypes" icon={<Icon.Card />}>
					Archetipi
				</Navbar.Item>
				<Navbar.Item to="seasons" icon={<Icon.Calendar />}>
					Stagioni
				</Navbar.Item>
				<Navbar.Item
					to="sign-in"
					onClick={() => signOut()}
					icon={<Icon.LogOut />}
				>
					Disconnettiti
				</Navbar.Item>
			</Navbar.Root>
			<Main.Content>
				<Outlet />
			</Main.Content>
		</Main.Root>
	);
};
