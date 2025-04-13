import { ReactNode } from "react";

export const GenericButton = ({
	className,
	onClick,
	disabled,
	children,
	type,
}: {
	children: ReactNode;
	className?: string;
	onClick?: (() => void) | undefined;
	disabled?: boolean | undefined;
	type?: "button" | "submit" | "reset" | undefined;
}) => {
	return (
		<button
			type={type ? type : "button"}
			className={`rounded-full w-[230px] lg:w-[245px] h-11 md:h-[52px] text-white md:text-[17px] font-medium hover:opacity-90 focus:outline-0 active:opacity-90 ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
