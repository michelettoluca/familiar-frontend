import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

export const RequireAuth = ({ allowedRole, redirectTo, children }) => {
	const { user } = useSession();

	const location = useLocation();

	if (user?.role !== allowedRole)
		return <Navigate to={redirectTo} state={{ from: location }} replace />;

	return children;
};
