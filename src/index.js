import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "./contexts/SessionContext";

import { role } from "./utils/constants";

import * as PublicPages from "./pages/public";
import * as DashboardPages from "./pages/dashboard";
import * as AdminPages from "./pages/admin";

import { RequireAuth } from "./components/RequireAuth";
import { Dashboard } from "./layouts/Dashboard";
import { Admin } from "./layouts/Admin";

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnMount: false } },
});

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/">
							{/* Public */}
							<Route index element={<PublicPages.Home />} />
							<Route path="admin/sign-in" element={<AdminPages.SignIn />} />
							<Route
								path="dashboard/sign-in"
								element={<DashboardPages.SignIn />}
							/>
							<Route
								path="dashboard"
								element={
									<RequireAuth
										allowedRole={role.ORGANIZER}
										redirectTo="/dashboard/sign-in"
									>
										<Dashboard />
									</RequireAuth>
								}
							>
								<Route index element={<DashboardPages.Overview />} />
								<Route path="players" element={<DashboardPages.Players />}>
									<Route path=":playerId" element={<DashboardPages.Player />} />
								</Route>
								<Route path="events">
									<Route index element={<DashboardPages.Events />} />
									<Route path=":eventId" element={<DashboardPages.Event />} />
								</Route>
								<Route
									path="create-event"
									element={<DashboardPages.CreateEvent />}
								/>
								<Route path="*" element={<span>no match</span>} />
							</Route>

							{/* Admin */}
							<Route
								path="admin"
								element={
									<RequireAuth allowedRole={role.ADMIN} redirectTo="sign-in">
										<Admin />
									</RequireAuth>
								}
							>
								<Route index element={<AdminPages.Overview />} />
								<Route path="archetypes" element={<AdminPages.Archetypes />} />
								<Route path="leagues" element={<AdminPages.Leagues />} />
								<Route path="seasons" element={<AdminPages.Seasons />} />
							</Route>
						</Route>
						<Route path="*" element={<span>no match</span>} />
					</Routes>
				</BrowserRouter>
				{/* <ReactQueryDevtools initialIsOpen={true} /> */}
			</SessionProvider>
		</QueryClientProvider>
	</React.StrictMode>,

	document.getElementById("root")
);
