import clsx from "clsx";
import { MagnifyingGlass } from "phosphor-react";

export const Input = ({
	type = "text",
	searchIcon,
	fullWidth,
	className,
	...props
}) => {
	const wrapperClass = clsx(
		"relative",
		fullWidth ? "100%" : "fit-content",
		className
	);

	const inputClass = clsx(
		`
			w-full appearance-none rounded-lg border border-gray-300 bg-white py-1.5 px-3 text-gray-600
			outline-black/5
			placeholder:text-gray-400 focus:border-gray-600 focus:outline focus:outline-4 
		`,
		searchIcon && "pl-7"
	);

	return (
		<div className={wrapperClass}>
			<input type={type} className={inputClass} {...props} />
			{searchIcon && (
				<MagnifyingGlass
					className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
					size={16}
				/>
			)}
		</div>
	);
};
