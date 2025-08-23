import React from "react";
import { RendererDefinition } from "./app";

const SpotifyIcon = React.memo((props: { name: Spicetify.Icon; size: number }) => (
	<Spicetify.ReactComponent.IconComponent
		semanticColor="textBase"
		dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons[props.name] }}
		iconSize={props.size}
	/>
));

type MainMenuProps = {
	renderers: RendererDefinition[];
	onSelectRenderer: (id: string) => void;
	onEnterFullscreen: () => void;
	onOpenWindow: () => void;
};

const MainMenu = React.memo((props: MainMenuProps) => (
	<Spicetify.ReactComponent.Menu>
		<Spicetify.ReactComponent.MenuSubMenuItem displayText="Renderer">
			{props.renderers.map(v => (
				<Spicetify.ReactComponent.MenuItem onClick={() => props.onSelectRenderer(v.id)}>
					{v.name}
				</Spicetify.ReactComponent.MenuItem>
			))}
		</Spicetify.ReactComponent.MenuSubMenuItem>
		<Spicetify.ReactComponent.MenuItem
			onClick={() => props.onEnterFullscreen()}
			trailingIcon={<SpotifyIcon name="fullscreen" size={16} />}
		>
			Enter Fullscreen
		</Spicetify.ReactComponent.MenuItem>
		<Spicetify.ReactComponent.MenuItem
			onClick={() => props.onOpenWindow()}
			trailingIcon={<SpotifyIcon name="external-link" size={16} />}
		>
			Open Window
		</Spicetify.ReactComponent.MenuItem>
	</Spicetify.ReactComponent.Menu>
));

export const MainMenuButton = React.memo((props: MainMenuProps & { className: string }) => {
	return (
		<Spicetify.ReactComponent.ContextMenu trigger="click" menu={<MainMenu {...props} />}>
			<Spicetify.ReactComponent.ButtonSecondary
				aria-label="menu"
				className={props.className}
				iconOnly={() => <SpotifyIcon name="menu" size={16} />}
			></Spicetify.ReactComponent.ButtonSecondary>
		</Spicetify.ReactComponent.ContextMenu>
	);
});
