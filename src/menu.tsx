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
	currentRendererId?: string;
	onSelectRenderer: (id: string) => void;
	onOpenWindow: () => void;
};

const MainMenu = React.memo((props: MainMenuProps) => (
	<Spicetify.ReactComponent.Menu>
		<Spicetify.ReactComponent.MenuSubMenuItem displayText="Renderer">
			{props.renderers.map(v => (
				<Spicetify.ReactComponent.MenuItem key={v.id} onClick={() => props.onSelectRenderer(v.id)}>
					{v.name}
				</Spicetify.ReactComponent.MenuItem>
			))}
		</Spicetify.ReactComponent.MenuSubMenuItem>
		<Spicetify.ReactComponent.MenuItem
			onClick={() => props.onOpenWindow()}
			trailingIcon={<SpotifyIcon name="external-link" size={16} />}
		>
			Open Window
		</Spicetify.ReactComponent.MenuItem>
	</Spicetify.ReactComponent.Menu>
));

export const MainMenuButton = React.memo((props: MainMenuProps & { className: string }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const menuRef = React.useRef<HTMLDivElement>(null);

	const handleClick = React.useCallback(() => {
		console.log("Menu button clicked"); // Debug log
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleMenuItemClick = React.useCallback((id: string) => {
		console.log("Renderer selected:", id); // Debug log
		props.onSelectRenderer(id);
		setIsOpen(false);
	}, [props.onSelectRenderer]);

	// Close menu when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div ref={menuRef} style={{ position: "relative" }}>
			<Spicetify.ReactComponent.ButtonSecondary
				aria-label="menu"
				className={props.className}
				onClick={handleClick}
				iconOnly={() => <SpotifyIcon name="menu" size={16} />}
			/>
			{isOpen && (
				<div style={{
					position: "absolute",
					top: "100%",
					right: 0,
					backgroundColor: "var(--spice-card)",
					border: "1px solid var(--spice-border)",
					borderRadius: "8px",
					padding: "8px 0",
					minWidth: "160px",
					zIndex: 1000,
					boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
				}}>
					<div style={{
						padding: "8px 16px",
						fontSize: "12px",
						fontWeight: "bold",
						color: "var(--spice-subtext)",
						borderBottom: "1px solid var(--spice-border)",
						marginBottom: "4px"
					}}>
						Visualization Mode
					</div>
					{props.renderers.map(renderer => {
						const isSelected = renderer.id === props.currentRendererId;
						return (
							<div
								key={renderer.id}
								onClick={() => handleMenuItemClick(renderer.id)}
								style={{
									padding: "8px 16px",
									cursor: "pointer",
									fontSize: "14px",
									color: isSelected ? "var(--spice-accent)" : "var(--spice-text)",
									borderBottom: renderer.id !== props.renderers[props.renderers.length - 1].id ? "1px solid var(--spice-border)" : "none",
									backgroundColor: isSelected ? "var(--spice-hover)" : "transparent",
									fontWeight: isSelected ? "bold" : "normal",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}
								onMouseEnter={(e) => {
									if (!isSelected) {
										e.currentTarget.style.backgroundColor = "var(--spice-hover)";
									}
								}}
								onMouseLeave={(e) => {
									if (!isSelected) {
										e.currentTarget.style.backgroundColor = "transparent";
									}
								}}
							>
								{renderer.name}
								{isSelected && (
									<span style={{ fontSize: "12px", color: "var(--spice-accent)" }}>✓</span>
								)}
							</div>
						);
					})}
					<div style={{
						borderTop: "1px solid var(--spice-border)",
						marginTop: "4px",
						paddingTop: "4px"
					}}>
						<div
							onClick={() => {
								console.log("Open window clicked"); // Debug log
								props.onOpenWindow();
								setIsOpen(false);
							}}
							style={{
								padding: "8px 16px",
								cursor: "pointer",
								fontSize: "14px",
								color: "var(--spice-text)",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "var(--spice-hover)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "transparent";
							}}
						>
							Open Window
							<SpotifyIcon name="external-link" size={16} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
});
