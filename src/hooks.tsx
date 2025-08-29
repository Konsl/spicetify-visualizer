import { useEffect, useState } from "react";

export function useFullscreenElement(document?: Document): Element | null {
	const [fullscreenElement, setFullscreenElement] = useState(document?.fullscreenElement ?? null);

	useEffect(() => {
		if (!document) return;
		const updateFullscreenElement = () => setFullscreenElement(document.fullscreenElement);

		document.addEventListener("fullscreenchange", updateFullscreenElement);
		return () => document.removeEventListener("fullscreenchange", updateFullscreenElement);
	}, [document]);

	return fullscreenElement;
}
