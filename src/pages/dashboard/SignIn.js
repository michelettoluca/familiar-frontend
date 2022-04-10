import styled from "styled-components";

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useSession } from "../../contexts/SessionContext";

import jwtDecode from "jwt-decode";

import * as api from "../../utils/familiarApi";
import { role } from "../../utils/constants";

import * as Input from "../../components/shared/Input";
import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import * as T from "../../components/shared/Typography";

import { Select } from "../../components/shared/Select";

const StyledContainer = styled(Container.Root)`
	position: fixed;
	top: 50%;
	left: 50%;

	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;

	width: 320px;

	@media (max-width: 30rem) {
		width: 100%;
		height: 100%;
		border: 0px;
		justify-content: center;
	}
`;

const StyledHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin: 1rem 0 2rem;

	text-align: center;
`;

const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;
`;

const Error = styled.div`
	background-color: var(--red-500);
	padding: 0.75rem;
	color: white;
`;

export const SignIn = () => {
	const navigate = useNavigate();

	const { user, setUser } = useSession();

	const { data: leagues, status } = useQuery(
		"leagues",
		() => api.getLeagues(),
		{
			onSuccess: (leagues) => setUsername(leagues?.[0]?.tag),
		}
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

	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [error, setError] = React.useState("");

	const handleSignIn = async () => {
		signIn({ username, password });
	};

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	if (user?.role === role.ORGANIZER)
		return <Navigate to="/dashboard" replace={true} />;

	return (
		<StyledContainer>
			<StyledHeader>
				<T.Heading2>Familiar</T.Heading2>
				<T.Paragraph>Dashboard</T.Paragraph>
			</StyledHeader>
			<FormWrapper>
				{error && <Error>{error}</Error>}
				<Select
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					fullWidth
				>
					{leagues.map((league) => (
						<option key={league.id} value={league.tag}>
							{league.name}
						</option>
					))}
				</Select>
				<Input.Password
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
				/>
				<Button.Dark onClick={handleSignIn} fullWidth>
					Accedi
				</Button.Dark>
			</FormWrapper>
		</StyledContainer>
	);
};
