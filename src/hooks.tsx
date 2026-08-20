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

export function useMouseRecentlyMoved(document?: Document, minDelayMs: number = 5000): boolean {
	const [moved, setMoved] = useState(true);

	useEffect(() => {
		if (!document) return;

		let currentState = moved;
		const sendMoved = (moved: boolean) => {
			if (currentState === moved) return;

			currentState = moved;
			setMoved(moved);
		};

		let timeout = 0;
		const onMove = () => {
			sendMoved(true);

			clearTimeout(timeout);
			timeout = setTimeout(() => sendMoved(false), minDelayMs);
		};

		document.addEventListener("mousemove", onMove);
		return () => document.removeEventListener("mousemove", onMove);
	}, [document]);

	return moved;
}
