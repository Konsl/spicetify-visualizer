export enum ExtensionKind {
	UNKNOWN_EXTENSION = 0,
	EXTRACTED_COLOR = 23, // type.googleapis.com/spotify.context_track_color.ColorResult
}

export enum CacheStatus {
	UNKNOWN = 0,
	OK = 1,
	NOT_RESOLVED = 2,
	NOT_FOUND = 3,
	UNAVAILABLE_FOR_LEGAL_REASONS = 4
}

export class MetadataService {
	service: any;
	serviceDescriptor: any;

	public constructor() {
		const webpack = (window as any).webpackChunkclient_web ?? (window as any).webpackChunkopen;
		const require = webpack.push([[Symbol()], {}, (re: any) => re]);
		const cache = Object.keys(require.m).map(id => require(id));
		const modules = cache
			.filter(module => typeof module === "object")
			.map(module => {
				try {
					return Object.values(module);
				} catch {}
			})
			.flat();

		const metadataService = modules.filter(
			m =>
				m &&
				typeof m === "function" &&
				"SERVICE_ID" in m &&
				m.SERVICE_ID === "spotify.mdata_esperanto.proto.MetadataService"
		);
		const createTransport = modules.filter(
			m =>
				m &&
				typeof m === "function" &&
				m.toString().includes("executeEsperantoCall") &&
				m.toString().includes("cancelEsperantoCall")
		);

		if (metadataService.length !== 1) return;
		if (createTransport.length !== 1) return;

		this.serviceDescriptor = metadataService[0] as any;
		this.service = new this.serviceDescriptor((createTransport[0] as any)());
	}

	public fetch(kind: ExtensionKind, entityUri: string): Promise<{ typeUrl: string; value: Uint8Array }> {
		return new Promise((resolve, reject) => {
			const cancel = this.service.observe(
				this.serviceDescriptor.METHODS.observe.requestType.fromPartial({
					extensionQuery: [
						{
							entityUri: entityUri,
							extensionKind: kind
						}
					]
				}),
				(response: any) => {
					if (response.pendingResponse) return;
					cancel.cancel();

					const success = response.extensionResult[0].status === 1;
					if (!success) {
						const cacheStatus: CacheStatus = response.extensionResult[0].details.cacheStatus;
						reject(cacheStatus);
						return;
					}

					const data = response.extensionResult[0].extensionData;
                    resolve(data);
				}
			);
		});
	}
}
