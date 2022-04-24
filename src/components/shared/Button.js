import clsx from "clsx";

export const Button = ({
	variant = "light",
	className,
	fullWidth,
	children,
	...props
}) => {
	const buttonClass = clsx(
		`
			flex items-center justify-center gap-x-1 py-1.5 px-3 rounded-lg 
			focus:border-gray-600 focus:outline focus:outline-4 focus:outline-black/5
		`,
		fullWidth ? "w-full" : "w-fit",
		variant === "dark" && "text-white  bg-gray-700",
		variant === "light" && "text-white  bg-gray-800",
		className
	);

	return (
		<button className={buttonClass} {...props}>
			{children}
		</button>
	);
};
