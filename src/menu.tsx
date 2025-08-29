import React from "react";
import { RendererDefinition } from "./app";

const SpotifyIcon = React.memo((props: { name: Spicetify.Icon | "empty"; size: number }) => (
	<Spicetify.ReactComponent.IconComponent
		semanticColor="textBase"
		dangerouslySetInnerHTML={{ __html: props.name !== "empty" ? Spicetify.SVGIcons[props.name] : undefined }}
		iconSize={props.size}
	/>
));

type MainMenuProps = {
	renderers: RendererDefinition[];
	currentRendererId: string;
	isFullscreen: boolean;

	onSelectRenderer: (id: string) => void;
	onEnterFullscreen: () => void;
	onExitFullscreen: () => void;
	onOpenWindow: () => void;
};

const MainMenu = React.memo((props: MainMenuProps) => (
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
));

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
