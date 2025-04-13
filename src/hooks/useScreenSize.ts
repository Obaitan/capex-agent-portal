"use client";

import { useState, useEffect } from "react";

export const useScreenSize = () => {
	const [screenSize, setScreenSize] = useState(
		typeof window === "undefined"
			? { width: 1200, height: 1000 }
			: {
					width: window.innerWidth,
					height: window.innerHeight,
			  }
	);

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return screenSize;
};
