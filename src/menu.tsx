import React, { useEffect, useState } from "react";
import { RendererDefinition } from "./app";
import { ColorSource, getSettings, saveSettings } from "./settings";
import { isValidHexColor } from "./utils";

const SpotifyIcon = React.memo((props: { name: Spicetify.Icon | "empty"; size: number }) => (
	<Spicetify.ReactComponent.IconComponent
		semanticColor="textBase"
		dangerouslySetInnerHTML={{ __html: props.name !== "empty" ? Spicetify.SVGIcons[props.name] : undefined }}
		iconSize={props.size}
	/>
));

const ColorInputModal = ({ initialColor, onConfirm }: { initialColor: string; onConfirm: (color: string) => void }) => {
	const [value, setValue] = useState(initialColor);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
			<Spicetify.ReactComponent.TextComponent variant="viola">Enter hex color code:</Spicetify.ReactComponent.TextComponent>
			<input
				type="text"
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
				style={{
					backgroundColor: "var(--spice-main-elevated)",
					color: "var(--spice-text)",
					border: "none",
					padding: "8px",
					borderRadius: "4px"
				}}
			/>
			<Spicetify.ReactComponent.ButtonPrimary
				onClick={() => {
					if (isValidHexColor(value)) {
						onConfirm(value);
						Spicetify.PopupModal.hide();
					} else {
						Spicetify.showNotification("Invalid hex color code!", true);
					}
				}}
			>
				Save
			</Spicetify.ReactComponent.ButtonPrimary>
		</div>
	);
};

type MainMenuProps = {
	renderers: RendererDefinition[];
	currentRendererId: string;
	isFullscreen: boolean;

	onSelectRenderer: (id: string) => void;
	onEnterFullscreen: () => void;
	onExitFullscreen: () => void;
	onOpenWindow: () => void;
};

const MainMenu = React.memo((props: MainMenuProps) => {
	const [settings, setSettings] = useState(getSettings());

	useEffect(() => {
		const handler = () => setSettings(getSettings());
		window.addEventListener("visualizer-settings-changed", handler);
		return () => window.removeEventListener("visualizer-settings-changed", handler);
	}, []);

	const handleSelectColorSource = (source: ColorSource) => {
		if (source === ColorSource.CUSTOM) {
			const promptColor = () => {
				const container = document.createElement("div");
				const handleModalClose = () => {
					Spicetify.ReactDOM.unmountComponentAtNode(container);
					container.remove();
				};

				Spicetify.ReactDOM.render(
					<ColorInputModal
						initialColor={settings.customColor}
						onConfirm={color => {
							saveSettings({ colorSource: ColorSource.CUSTOM, customColor: color });
							handleModalClose();
						}}
					/>,
					container
				);
				Spicetify.PopupModal.display({
					title: "Custom Color",
					content: container
				});

				const originalHide = Spicetify.PopupModal.hide;
				Spicetify.PopupModal.hide = () => {
					handleModalClose();
					originalHide();
					Spicetify.PopupModal.hide = originalHide;
				};
			};
			promptColor();
		} else {
			saveSettings({ colorSource: source });
		}
	};

	return (
		<Spicetify.ReactComponent.Menu>
			<Spicetify.ReactComponent.MenuSubMenuItem displayText="Renderer">
				{props.renderers.map(v => (
					<Spicetify.ReactComponent.MenuItem
						onClick={() => props.onSelectRenderer(v.id)}
						leadingIcon={<SpotifyIcon name={v.id === props.currentRendererId ? "check" : "empty"} size={16} />}
					>
						{v.name}
					</Spicetify.ReactComponent.MenuItem>
				))}
			</Spicetify.ReactComponent.MenuSubMenuItem>

			<Spicetify.ReactComponent.MenuSubMenuItem displayText="Color Source">
				<Spicetify.ReactComponent.MenuItem
					onClick={() => handleSelectColorSource(ColorSource.EXTRACTED)}
					leadingIcon={
						<SpotifyIcon name={settings.colorSource === ColorSource.EXTRACTED ? "check" : "empty"} size={16} />
					}
				>
					Song Color
				</Spicetify.ReactComponent.MenuItem>
				<Spicetify.ReactComponent.MenuItem
					onClick={() => handleSelectColorSource(ColorSource.THEME)}
					leadingIcon={<SpotifyIcon name={settings.colorSource === ColorSource.THEME ? "check" : "empty"} size={16} />}
				>
					Theme Color
				</Spicetify.ReactComponent.MenuItem>
				<Spicetify.ReactComponent.MenuItem
					onClick={() => handleSelectColorSource(ColorSource.CUSTOM)}
					leadingIcon={<SpotifyIcon name={settings.colorSource === ColorSource.CUSTOM ? "check" : "empty"} size={16} />}
				>
					Custom Color...
				</Spicetify.ReactComponent.MenuItem>
			</Spicetify.ReactComponent.MenuSubMenuItem>

			<Spicetify.ReactComponent.MenuItem
				onClick={() => (props.isFullscreen ? props.onExitFullscreen() : props.onEnterFullscreen())}
				trailingIcon={<SpotifyIcon name={props.isFullscreen ? "minimize" : "fullscreen"} size={16} />}
			>
				{props.isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
			</Spicetify.ReactComponent.MenuItem>
			<Spicetify.ReactComponent.MenuItem
				onClick={() => props.onOpenWindow()}
				trailingIcon={<SpotifyIcon name="external-link" size={16} />}
			>
				Open Window
			</Spicetify.ReactComponent.MenuItem>
		</Spicetify.ReactComponent.Menu>
	);
});

export const MainMenuButton = React.memo((props: MainMenuProps & { className: string; renderInline?: boolean }) => {
	return (
		<Spicetify.ReactComponent.ContextMenu trigger="click" renderInline={props.renderInline} menu={<MainMenu {...props} />}>
			<Spicetify.ReactComponent.ButtonSecondary
				aria-label="menu"
				className={props.className}
				iconOnly={() => <SpotifyIcon name="menu" size={16} />}
			></Spicetify.ReactComponent.ButtonSecondary>
		</Spicetify.ReactComponent.ContextMenu>
	);
});
