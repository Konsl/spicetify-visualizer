import React from "react";
import App from "./app";

export function createVisualizerWindow(rendererId: string): string | null {
	try {
		const win = window.open();
		if (!win) return `window.open returned ${win}`;

		document.querySelectorAll("style, link[rel=stylesheet]").forEach(node => {
			const clonedNode = win.document.importNode(node, true);
			win.document.head.appendChild(clonedNode);
		});

		win.document.documentElement.className = document.documentElement.className;
		win.document.body.className = document.body.className;

		Spicetify.ReactDOM.render(<App isSecondaryWindow={true} initialRenderer={rendererId} />, win.document.body);

		// TODO: unmount when the window closes

		return null;
	} catch (e) {
		console.error("[Visualizer]", "error opening popup window", e);

		if (!e) return "unknown error";
		return `${e}`;
	}
}
