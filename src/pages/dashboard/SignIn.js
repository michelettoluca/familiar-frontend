import { Spinner } from "phosphor-react";

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import jwtDecode from "jwt-decode";

import * as api from "../../utils/familiarApi";
import { role } from "../../utils/constants";

import { Input } from "../../components/shared/Input";
import { Button } from "../../components/shared/Button";
import { Select } from "../../components/shared/Select";

export const SignIn = () => {
	const navigate = useNavigate();

	const { user, setUser } = useSession();

	const { data: leagues, status } = useQuery(
		"leagues",
		() => api.getLeagues(),
		{ onSuccess: (leagues) => setUsername(leagues?.[0].tag) }
	);

	const { mutate: signIn } = useMutation(api.signIn, {
		onSuccess: (newAccessToken) => {
			setUser(jwtDecode(newAccessToken));
			navigate("/dashboard");
		},
		onError: (err) => {
			setError(err.response.data.error);
		},
	});

	const [username, setUsername] = React.useState(leagues?.[0].tag || "");
	const [password, setPassword] = React.useState("");

	const [error, setError] = React.useState("");

	const handleSignIn = async () => {
		signIn({ username, password });
	};

	if (status === "loading")
		return (
			<Spinner
				className="fixed top-[calc(50%_-_16px)] left-[calc(50%_-_16px)] animate-spin"
				size={32}
			/>
		);

	// if (status === "error") return <span>error</span>;

	if (user?.role === role.ORGANIZER)
		return <Navigate to="/dashboard" replace={true} />;

	return (
		<div
			className="
				flex h-screen flex-col justify-center  border-gray-200 p-6 
				sm:mx-auto sm:mt-16 sm:h-auto sm:w-96 sm:rounded-lg sm:border sm:shadow-xl
			"
		>
			<h1 className="text-2xl font-bold text-gray-800">Familiar</h1>
			<span className="mb-4 block font-medium text-gray-400">Dashboard</span>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSignIn();
				}}
			>
				<span className="mb-1 block font-medium text-gray-600">Lega</span>
				<Select
					className="mb-4"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					fullWidth
				>
					<option disabled>Seleziona una lega</option>
					{leagues.map((league) => (
						<option key={league.id} value={league.tag}>
							{league.name}
						</option>
					))}
				</Select>
				<span className="mb-1 block font-medium text-gray-600">Password</span>
				<Input
					type="password"
					className="mb-4"
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
				/>
				{error && <span className="font-medium text-red-700">{error}</span>}
				<Button
					className="mt-6"
					onClick={handleSignIn}
					variant="dark"
					fullWidth
				>
					Accedi
				</Button>
			</form>
		</div>
	);
};
