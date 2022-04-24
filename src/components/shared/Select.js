import clsx from "clsx";
import { CaretDown } from "phosphor-react";

export const Select = ({ fullWidth, className, children, ...props }) => {
	const wrapperClass = clsx(
		"relative",
		fullWidth ? "w-full" : "w-fit",
		className
	);
	return (
		<div className={wrapperClass}>
			<select
				className="
					appearance-none w-full py-2 px-3 text-gray-600 bg-white border border-gray-300 rounded-lg
					placeholder:text-gray-400
					focus:border-gray-600 focus:outline focus:outline-4 focus:outline-black/5
				"
				{...props}
			>
				{children}
			</select>
			<CaretDown
				size={14}
				className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
			/>
		</div>
	);
};
