import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

import * as Input from "../../components/shared/Input";
import * as Button from "../../components/shared/Button";
import { Heading4 } from "../../components/shared/Typography";

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

	if (user?.role === "admin") return <Navigate to="/admin" replace={true} />;

	return (
		<div className="flex  items-center justify-center h-screen">
			<form
				id="signup"
				onSubmit={(e) => {
					e.preventDefault();
					handleSignIn();
				}}
			>
				<div className="flex flex-col p-8 w-96 bg-white shadow-sm rounded-sm gap-2">
					<Heading4>Admin</Heading4>
					<Input.Text
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
					/>
					<Input.Password
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						fullWidth
					/>

					<Button.Dark onClick={handleSignIn} fullWidth>
						Accedi
					</Button.Dark>
				</div>
			</form>
		</div>
	);
};
