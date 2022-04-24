import clsx from "clsx";

export const Input = ({ type = "text", className, ...props }) => {
	const inputClass = clsx(
		`
		appearance-none w-full py-2 px-3 text-gray-600 bg-white border border-gray-300 rounded-lg
		placeholder:text-gray-400
		focus:border-gray-600 focus:outline focus:outline-4 outline-black/5
		`,
		className
	);
	return <input type={type} className={inputClass} {...props} />;
};
