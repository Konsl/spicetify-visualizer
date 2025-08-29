import { SpotifyModules } from "./modules";

export enum ExtensionKind {
	UNKNOWN_EXTENSION = 0,
	EXTRACTED_COLOR = 23 // type.googleapis.com/spotify.context_track_color.ColorResult
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
		const metadataService = SpotifyModules.getMetadataService();
		const createTransport = SpotifyModules.getCreateTransport();

		if (!metadataService) return;
		if (!createTransport) return;

		this.serviceDescriptor = metadataService as any;
		this.service = new this.serviceDescriptor((createTransport as any)());
	}

	public fetch(kind: ExtensionKind, entityUri: string): Promise<{ typeUrl: string; value: Uint8Array }> {
		return new Promise((resolve, reject) => {
			if (!this.service || !this.serviceDescriptor) reject(CacheStatus.UNKNOWN);

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
