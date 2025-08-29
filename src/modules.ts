type ModuleState = { state: "failed" } | { state: "succeeded"; value: unknown };

export class SpotifyModules {
	private static modules: unknown[] | null = null;
	private static loadedModules: Record<string, ModuleState> = {};

	private static init() {
		const webpack = (window as any).webpackChunkclient_web ?? (window as any).webpackChunkopen;
		const require = webpack.push([[Symbol()], {}, (re: any) => re]);
		const cache = Object.keys(require.m).map(id => require(id));

		this.modules = cache
			.filter(module => typeof module === "object")
			.map(module => {
				try {
					return Object.values(module);
				} catch {}
			})
			.flat();
	}

	private static getValue(cacheKey: string, filterFn: (m: unknown) => unknown): unknown | null {
		if (!this.modules) this.init();

		if (!(cacheKey in this.loadedModules)) {
			const candidates = this.modules!.filter(filterFn);

			if (candidates.length === 1) {
				this.loadedModules[cacheKey] = {
					state: "succeeded",
					value: candidates[0]
				};
			} else {
				this.loadedModules[cacheKey] = {
					state: "failed"
				};
			}
		}

		const state = this.loadedModules[cacheKey];
		if (state.state === "failed") return null;
		if (state.state === "succeeded") return state.value;
	}

	public static getMetadataService(): unknown | null {
		return this.getValue(
			"metadataService",
			m =>
				m &&
				typeof m === "function" &&
				"SERVICE_ID" in m &&
				m.SERVICE_ID === "spotify.mdata_esperanto.proto.MetadataService"
		);
	}

	public static getCreateTransport(): unknown | null {
		return this.getValue(
			"createTransport",
			m =>
				m &&
				typeof m === "function" &&
				m.toString().includes("executeEsperantoCall") &&
				m.toString().includes("cancelEsperantoCall")
		);
	}

	public static getStyleSheetManager(): unknown | null {
		return this.getValue(
			"styleSheetManager",
			m =>
				m &&
				typeof m === "function" &&
				m.toString().includes("stylisPlugins") &&
				m.toString().includes("reconstructWithOptions") &&
				m.toString().includes("disableCSSOMInjection") &&
				m.toString().includes("disableVendorPrefixes")
		);
	}
}
