import { useEffect, useRef } from "react";

export const useClickOutside = (elRef, callback = () => {}) => {
	const callbackRef = useRef(null);
	callbackRef.current = callback;

	useEffect(() => {
		const handleClick = (e) => {
			if (elRef.current && !elRef.current.contains(e.target)) {
				callbackRef.current();
			}
		};

		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [elRef]);
};
