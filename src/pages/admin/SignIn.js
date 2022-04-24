import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

import { role } from "../../utils/constants";

import { Input } from "../../components/shared/Input";
import { Button } from "../../components/shared/Button";
import * as T from "../../components/shared/Typography";

export const SignIn = () => {
	const { user, signIn } = useSession();
	const navigate = useNavigate();

	const [username, setUsername] = React.useState("admin");
	const [password, setPassword] = React.useState("FaoA9EyK*f3I");

	const handleSignIn = async () => {
		if (!username) return console.log("Insert a password");
		if (!password) return console.log("Insert a password");

		await signIn({ username, password });
		navigate("/admin");
	};

	if (user?.role === role.ADMIN) return <Navigate to="/admin" replace={true} />;

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				id="signup"
				onSubmit={(e) => {
					e.preventDefault();
					handleSignIn();
				}}
			>
				<div className="flex flex-col p-8 w-96 bg-white shadow-sm rounded-sm gap-2">
					<T.Heading4>Admin</T.Heading4>
					<Input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
					/>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						fullWidth
					/>

					<Button variant="dark" onClick={handleSignIn} fullWidth>
						Accedi
					</Button>
				</div>
			</form>
		</div>
	);
};
