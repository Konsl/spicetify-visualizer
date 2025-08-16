import React from "react";
import App from "./app";

export function createVisualizerWindow(rendererId: string) {
	try {
		const win = window.open();
		if (!win) return false;

		document.querySelectorAll("link[rel=stylesheet]").forEach(e => {
			const newElement = win.document.createElement("link");
			newElement.setAttribute("rel", "stylesheet");
			newElement.setAttribute("href", (e as HTMLLinkElement).href);

			win.document.head.appendChild(newElement);
		});
		document.querySelectorAll("style").forEach(e => {
			const newElement = win.document.createElement("style");
			newElement.innerText = e.innerText;

			win.document.head.appendChild(newElement);
		});

		win.document.documentElement.className = document.documentElement.className;
		win.document.body.className = document.body.className;

		// Make background transparent
		win.document.body.style.background = 'transparent';
		win.document.documentElement.style.background = 'transparent';

		Spicetify.ReactDOM.render(<App isSecondaryWindow={true} initialRenderer={rendererId} />, win.document.body);

		return true;
	} catch {
		return false;
	}
}
