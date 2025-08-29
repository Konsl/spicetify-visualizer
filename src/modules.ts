type ModuleState = { state: "uninitialized" } | { state: "failed" } | { state: "succeeded"; value: unknown };

export class SpotifyModules {
	private static modules: unknown[] | null = null;

	private static state: Record<string, ModuleState> = {
		metadataService: { state: "uninitialized" },
		createTransport: { state: "uninitialized" },
		styleSheetManager: { state: "uninitialized" }
	};

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

	private static getValue(key: string, filterFn: (m: unknown) => unknown): unknown | null {
		if (!(key in this.state)) return null;
		if (!this.modules) this.init();

		const state = this.state[key];
		if (state.state === "failed") return null;
		if (state.state === "succeeded") return state.value;

		const candidates = this.modules!.filter(filterFn);
		if (candidates.length === 1) {
			this.state[key] = {
				state: "succeeded",
				value: candidates[0]
			};
			return candidates[0];
		}

		this.state[key] = {
			state: "failed"
		};

		return null;
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
