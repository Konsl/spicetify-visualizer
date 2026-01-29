export enum ColorSource {
	EXTRACTED = "extracted",
	THEME = "theme",
	CUSTOM = "custom"
}

export type VisualizerSettings = {
	colorSource: ColorSource;
	customColor: string;
};

const SETTINGS_KEY = "visualizer:settings";

const DEFAULT_SETTINGS: VisualizerSettings = {
	colorSource: ColorSource.EXTRACTED,
	customColor: "#FFFFFF"
};

export function getSettings(): VisualizerSettings {
	const settings = Spicetify.LocalStorage.get(SETTINGS_KEY);
	if (!settings) return DEFAULT_SETTINGS;

	try {
		return { ...DEFAULT_SETTINGS, ...JSON.parse(settings) };
	} catch {
		return DEFAULT_SETTINGS;
	}
}

export function saveSettings(settings: Partial<VisualizerSettings>) {
	const currentSettings = getSettings();
	const newSettings = { ...currentSettings, ...settings };
	Spicetify.LocalStorage.set(SETTINGS_KEY, JSON.stringify(newSettings));
	window.dispatchEvent(new Event("visualizer-settings-changed"));
}
