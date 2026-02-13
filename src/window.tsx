import React from "react";
import App from "./app";
import { SpotifyModules } from "spicetify-utils";

export async function createVisualizerWindow(rendererId: string) {
	try {
		let win = window.open();
		if (!win) {
			let errorMessage = "fallback PiP API is not available";

			if ((window as any).documentPictureInPicture) {
				if ((window as any).documentPictureInPicture.window) errorMessage = "cannot open another PiP window";
				else
					win = await (window as any).documentPictureInPicture.requestWindow().catch((e: any) => {
						if (e) errorMessage = `${e}`;
						else errorMessage = "unknown error";
						return null;
					});
			}

			if (!win) {
				Spicetify.showNotification(
					<span>
						Failed to open window: {errorMessage}. Try with devtools using{" "}
						<code
							style={{
								fontSize: "12px",
								background: "rgba(0 0 0 / 0.2)",
								borderRadius: "4px",
								padding: "2px"
							}}
						>
							spicetify enable-devtools
						</code>
						.
					</span>,
					true
				);
				return;
			}
		}

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
		const visualizerNode = (
			<App isSecondaryWindow={true} onWindowDestroyed={destructor} initialRenderer={rendererId} />
		);

		if (StyleSheetManager) {
			Spicetify.ReactDOM.render(
				<StyleSheetManager target={popupDocument.head}>{visualizerNode}</StyleSheetManager>,
				popupDocument.body
			);
		} else {
			Spicetify.showNotification(
				"[Visualizer] Could not find StyleSheetManager. Styles in popup window probably won't work.",
				true
			);

			Spicetify.ReactDOM.render(visualizerNode, popupDocument.body);
		}
	} catch (e) {
		console.error("[Visualizer]", "error opening popup window", e);

		let error = "unknown error";
		if (e) error = `${e}`;

		Spicetify.showNotification(`Failed to open window: ${error}`, true);
	}
}
