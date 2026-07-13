export class AudioSyncManager {
	static correctLatency: boolean = true;
	static references: number = 0;
	static isCorrectingLatency: boolean = false;

	static stableLatency: number = 0;
	static audioContext: AudioContext = new AudioContext();

	static _init = (() => {
		this.audioContext.suspend();

		const oscillator = this.audioContext.createOscillator();
		const gain = this.audioContext.createGain();

		// play inaudible tone so that the context doesn't get auto-suspended
		oscillator.frequency.value = 20000;
		gain.gain.value = 0.0001;
		oscillator.connect(gain).connect(this.audioContext.destination);
		oscillator.start();
	})();

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

		if (shouldCorrectLatency) this.audioContext.resume();
		else this.audioContext.suspend();

		this.isCorrectingLatency = shouldCorrectLatency;
	}

	public static getProgress(): number {
		let latency = 0;

		if (this.correctLatency) {
			const currentLatency = this.audioContext.outputLatency;
			if (Math.abs(this.stableLatency - currentLatency) > 0.02) this.stableLatency = currentLatency;

			latency = this.stableLatency;
		}

		return Spicetify.Player.getProgress() / 1000 - latency;
	}
}
AudioSyncManager.updateCorrectLatency();
