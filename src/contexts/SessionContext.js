import decodeJwt from "jwt-decode";

import React from "react";
import { useQuery, useMutation } from "react-query";

import * as api from "../utils/familiarApi";

const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);

	const { status } = useQuery("accessToken", () => api.refreshToken(), {
		onSuccess: (newAccessToken) => setUser(decodeJwt(newAccessToken)),
		retry: false,
		refetchOnWindowFocus: false,
	});

	const { mutateAsync: signIn } = useMutation(api.signIn, {
		onSuccess: (newAccessToken) => setUser(decodeJwt(newAccessToken)),
		// onError: () => setUser(null),
	});

	const { mutate: signOut } = useMutation(api.signOut, {
		onSuccess: () => setUser(null),
	});

	// console.log(status, user);

	if (status === "loading") return <span>loading...</span>;

	return (
		<SessionContext.Provider
			value={{
				user,
				signIn,
				signOut,
				setUser,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => React.useContext(SessionContext);
