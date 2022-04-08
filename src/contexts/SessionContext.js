import React from "react";
import * as api from "../utils/familiarApi";
import { useQuery, useMutation } from "react-query";
import decodeJwt from "jwt-decode";

const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);

	useQuery("accessToken", () => api.refreshToken(), {
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

	const contextValue = {
		user,
		signIn,
		signOut,
	};

	// if (status === "idle") return null;

	// if (status === "loading") return <span>loading...</span>;

	return (
		<SessionContext.Provider value={contextValue}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => React.useContext(SessionContext);
