type CancelState = { cancelled: boolean; timeout?: [number, () => void] };

function wait(duration: number, cancel: CancelState) {
	return new Promise((res, _rej) => {
		if (cancel.cancelled) return res(undefined);

		const callback = () => {
			cancel.timeout = undefined;
			res(undefined);
		};
		cancel.timeout = [setTimeout(callback, duration), callback];
	});
}

export class AudioSyncManager {
	static correctLatency: boolean = true;
	static references: number = 0;
	static isCorrectingLatency: boolean = false;

	static stableLatency: number = 0;
	static audioContext: AudioContext = new AudioContext();

	static cancel: () => void = () => {};
	static promise: Promise<void> = this.audioContext.suspend();

	public static addReference() {
		this.references++;
		this.updateCorrectLatency();
	}

	public static removeReference() {
		this.references--;
		this.updateCorrectLatency();
	}

	public static setCorrectLatency(correctLatency: boolean) {
		this.correctLatency = correctLatency;
		this.updateCorrectLatency();
	}

	public static getCorrectLatency(): boolean {
		return this.correctLatency;
	}

	static updateCorrectLatency() {
		const shouldCorrectLatency = this.correctLatency && this.references > 0;
		if (shouldCorrectLatency === this.isCorrectingLatency) return;

		if (shouldCorrectLatency) this.startMeasurement();
		else this.endMeasurement();

		this.isCorrectingLatency = shouldCorrectLatency;
	}

	static startMeasurement() {
		this.endMeasurement();

		const cancelState: CancelState = { cancelled: false };
		this.promise = this.promise.then(this.measurement.bind(this, cancelState)).catch(() => {});

		this.cancel = () => {
			cancelState.cancelled = true;

			const timeout = cancelState.timeout;
			if (timeout !== undefined) {
				cancelState.timeout = undefined;

				clearTimeout(timeout[0]);
				timeout[1]();
			}
		};
	}

	static endMeasurement() {
		this.cancel();
	}

	static async measurement(cancel: CancelState) {
		while (!cancel.cancelled) {
			console.log("[Visualizer AudioSync] resuming context");
			await this.audioContext.resume();
			console.log("[Visualizer AudioSync] waiting for stable latency");
			await this.waitStableLatency(cancel);
			this.stableLatency = this.audioContext.outputLatency;
			console.log("[Visualizer AudioSync] latency stabilized: ", this.stableLatency);
			await this.audioContext.suspend();
			console.log("[Visualizer AudioSync] suspended context");

			await wait(10000, cancel);
		}
	}

	static async waitStableLatency(cancel: CancelState) {
		let totalWait = 0;
		const samples = [];

		while (totalWait < 5000 && !cancel.cancelled) {
			await wait(200, cancel);
			totalWait += 200;

			samples.push(this.audioContext.outputLatency);
			if (samples.length < 5) continue;
			if (samples.length > 5) samples.shift();

			const spread = Math.max(...samples) - Math.min(...samples);
			if (spread < 0.01) break;
		}
	}

	public static close(): Promise<void> {
		this.cancel();
		return this.promise;
	}

	public static getProgress(): number {
		const latency = this.correctLatency ? this.stableLatency : 0;
		return Spicetify.Player.getProgress() / 1000 - latency;
	}
}
AudioSyncManager.updateCorrectLatency();
