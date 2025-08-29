import React from "react";
import App from "./app";
import { SpotifyModules } from "./modules";

export function createVisualizerWindow(rendererId: string): string | null {
	try {
		const win = window.open();
		if (!win) return `window.open returned ${win}`;
		const popupDocument = win.document;

		Array.from(document.styleSheets).forEach(s => {
			if (!s.ownerNode || !("tagName" in s.ownerNode)) return;
			const node = s.ownerNode;

			const clonedNode = popupDocument.importNode(node, true);
			popupDocument.head.appendChild(clonedNode);
		});

		popupDocument.documentElement.className = document.documentElement.className;
		popupDocument.body.className = document.body.className;

		const StyleSheetManager = SpotifyModules.getStyleSheetManager() as any;
		const destructor = Spicetify.ReactDOM.unmountComponentAtNode(popupDocument.body);
		const visualizerNode = <App isSecondaryWindow={true} onWindowDestroyed={destructor} initialRenderer={rendererId} />;

		if (StyleSheetManager) {
			Spicetify.ReactDOM.render(
				<StyleSheetManager target={popupDocument.head}>{visualizerNode}</StyleSheetManager>,
				popupDocument.body
			);
		} else {
			Spicetify.showNotification(
				"[Visualizer] Could not find StyleSheetManager. Styles in popup window propably won't work.",
				true
			);

			Spicetify.ReactDOM.render(visualizerNode, popupDocument.body);
		}

		return null;
	} catch (e) {
		console.error("[Visualizer]", "error opening popup window", e);

		if (!e) return "unknown error";
		return `${e}`;
	}
}
