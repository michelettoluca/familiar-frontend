import styled from "styled-components";

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";

import * as Input from "../../components/shared/Input";
import * as Button from "../../components/shared/Button";
import * as Container from "../../components/shared/Container";
import { Heading4 } from "../../components/shared/Typography";

import { CaretDown } from "phosphor-react";

export const SignIn = () => {
	const navigate = useNavigate();

	const { user, signIn } = useSession();

	const { data: leagues, status } = useQuery("leagues", () => api.getLeagues());

	const [league, setLeague] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSignIn = async () => {
		if (!league) return console.log("Select a league");

		if (!password) return console.log("Insert a password");

		await signIn({ username: league.tag, password });
		navigate("/dashboard");
	};

	if (status === "idle") return null;

	if (status === "error") return <span>error</span>;

	if (status === "loading") return <span>loading...</span>;

	if (user?.role === "organizer")
		return <Navigate to="/dashboard" replace={true} />;

	return (
		<Container.Root
			maxWidth="50rem"
			style={{ transform: "translateY(calc(50vh - 50%))", margin: "0 auto" }}
		>
			<Heading4>Dashboard</Heading4>
			<Select
				placeholder="Seleziona"
				options={leagues}
				value={league}
				onChange={setLeague}
				fullWidth
			/>
			<Input.Password
				value={password}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				fullWidth
			/>
			<Button.Dark onClick={handleSignIn} fullWidth>
				Accedi
			</Button.Dark>
		</Container.Root>
		// </div>
	);
};

const StyledDropdown = styled.div``;

const Select = ({ options, value, onChange, placeholder }) => {
	const [showDropdown, setShowDropdown] = React.useState(false);

	const selectRef = React.useRef(null);

	useClickOutside(selectRef, () => setShowDropdown(false));

	const selectClass = "";
	// const selectClass = classNames(
	// 	"relative py-2 px-3 bg-white border border-gray-300 rounded-sm cursor-pointer",
	// 	{
	// 		"outline outline-2 outline-offset-1 outline-gray-800": showDropdown,
	// 	}
	// );

	return (
		<div
			ref={selectRef}
			className={selectClass}
			onClick={() => setShowDropdown(!showDropdown)}
		>
			<div className="flex flex-col h-9 justify-center">
				{value ? (
					<>
						<span className="text-gray-400 text-xs">{value.tag}</span>
						<span className="text-gray-600">{value.name}</span>
					</>
				) : (
					<span className="text-gray-400">{placeholder}</span>
				)}
			</div>
			<CaretDown />

			{showDropdown && (
				<div className="absolute top-full -left-px -right-px flex flex-col bg-white border border-gray-300 max-h-[208px] overflow-y-auto">
					{options.map((league) => (
						<div
							key={league.id}
							className="flex py-2 px-3 flex-col hover:bg-slate-50 last:border-b-0 border-b border-b-gray-200"
							onClick={() => onChange(league)}
						>
							<span className="text-gray-400 text-xs">{league.tag}</span>
							<span className="text-gray-600">{league.name}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
