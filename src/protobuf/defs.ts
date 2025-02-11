export class Reader {
	private buffer: Uint8Array;
	private offset: number;

	constructor(buffer: Uint8Array | DataView) {
		if (buffer instanceof DataView) buffer = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

		this.buffer = buffer;
		this.offset = 0;
	}

	getVarIntView(): DataView {
		let end = this.offset;
		while (end < this.buffer.length - 1 && this.buffer[end] & 0x80) end++;
		end++;

		return this.getView(end - this.offset);
	}

	getVarInt(): bigint {
		if (this.isExhausted()) return 0n;

		let value = 0n;
		let shift = 0n;

		let byte: bigint;
		do {
			byte = BigInt(this.buffer[this.offset++]);

			value |= (byte & 0x7fn) << shift;
			shift += 7n;
		} while (byte & 0x80n && !this.isExhausted());

		return value;
	}

	getArray(n: number): Uint8Array {
		let amount = Math.min(n, this.buffer.length - this.offset);

		const value = this.buffer.slice(this.offset, this.offset + amount);
		this.offset += amount;
		return value;
	}

	getView(n: number): DataView {
		let amount = Math.min(n, this.buffer.length - this.offset);

		const value = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.offset, amount);
		this.offset += amount;
		return value;
	}

	has(n: number): boolean {
		return this.buffer.length - this.offset >= n;
	}

	isExhausted(): boolean {
		return !this.has(1);
	}
}

function sign(x: bigint, n: number): bigint {
	return x & (1n << BigInt(n * 8 - 1)) ? x - (1n << BigInt(n * 8)) : x;
}

export enum PBBaseType {
	VarInt,
	Fixed4,
	Fixed8,
	LDelim
}

type PBValueSingle<T> = [PBBaseType, (view: DataView) => T];
type PBValueArray<T extends any[]> = [PBBaseType, (view: DataView) => T, true];
export type PBValue<T> = PBValueSingle<T> | (T extends any[] ? PBValueArray<T> : never);
export type PBValueTypeOf<T> = T extends PBValue<infer U> ? U : never;

function readValue<T>(reader: Reader, value: PBValue<T>): [true, T] | [false, undefined] {
	switch (value[0]) {
		case PBBaseType.Fixed4:
			return reader.has(4) ? [true, value[1](reader.getView(4))] : [false, undefined];
		case PBBaseType.Fixed8:
			return reader.has(8) ? [true, value[1](reader.getView(8))] : [false, undefined];
		case PBBaseType.VarInt:
			return [true, value[1](reader.getVarIntView())];
		case PBBaseType.LDelim:
			const length = Number(reader.getVarInt());
			return [true, value[1](reader.getView(length))];
	}
}

export function mapPBValue<U, V>(value: PBValue<U>, fn: (value: U) => V): PBValue<V> {
	return [value[0], view => fn(value[1](view))];
}

export const PBVarInt: PBValue<bigint> = [PBBaseType.VarInt, view => new Reader(view).getVarInt()];
export const PBBool: PBValue<boolean> = mapPBValue(PBVarInt, x => !!x);
export const PBUInt32: PBValue<number> = mapPBValue(PBVarInt, Number);
export const PBUInt64: PBValue<bigint> = PBVarInt;
export const PBInt32: PBValue<number> = mapPBValue(PBVarInt, x => Number(sign(x, 4)));
export const PBInt64: PBValue<bigint> = mapPBValue(PBVarInt, x => sign(x, 8));

export const PBFloat32: PBValue<number> = [PBBaseType.Fixed4, view => view.getFloat32(0, true)];
export const PBFloat64: PBValue<number> = [PBBaseType.Fixed8, view => view.getFloat64(0, true)];
export const PBFixed32: PBValue<number> = [PBBaseType.Fixed4, view => view.getUint32(0, true)];
export const PBFixed64: PBValue<bigint> = [PBBaseType.Fixed8, view => view.getBigUint64(0, true)];
export const PBSFixed32: PBValue<number> = [PBBaseType.Fixed4, view => view.getInt32(0, true)];
export const PBSFixed64: PBValue<bigint> = [PBBaseType.Fixed8, view => view.getBigInt64(0, true)];

export const PBString: PBValue<string> = [PBBaseType.LDelim, view => new TextDecoder().decode(view)];
export const PBBytes: PBValue<Uint8Array> = [
	PBBaseType.LDelim,
	view => new Uint8Array(view.buffer, view.byteOffset, view.byteLength)
];

export function PBEnum<T>(values: Record<number, T>): PBValue<T> {
	return mapPBValue(PBVarInt, x => values[Number(x)]);
}

export function PBRepeated<T>(value: PBValue<T>): PBValue<T[]> {
	let newType = mapPBValue(value, x => [x]);
	newType[2] = true;

	return newType;
}

export function PBRepeatedPacked<T>(value: PBValue<T>): PBValue<T[]> {
	return [
		PBBaseType.LDelim,
		view => {
			const reader = new Reader(view);
			const values: T[] = [];

			while (!reader.isExhausted()) {
				const [success, result] = readValue(reader, value);
				if (!success) break;

				values.push(result);
			}

			return values;
		}
	];
}

function verifyType(tag: number, expected: PBBaseType): boolean {
	switch (expected) {
		case PBBaseType.VarInt:
			return (tag & 7) === 0;
		case PBBaseType.Fixed4:
			return (tag & 7) === 5;
		case PBBaseType.Fixed8:
			return (tag & 7) === 1;
		case PBBaseType.LDelim:
			return (tag & 7) === 2;
	}
}

type PBMessageFields<T extends Record<string, unknown>> = {
	[K in keyof T]: { id: number; value: PBValue<T[K]> };
};
type PBMessageFieldEntry<T> = { id: number; value: PBValue<T[keyof T]> };

export function make<T>(id: number, value: PBValue<T>): { id: number; value: PBValue<T> } {
	return { id, value };
}

export function PBMessage<T extends Record<string, unknown>>(fields: PBMessageFields<T>): PBValue<Partial<T>> {
	return [
		PBBaseType.LDelim,
		view => {
			const reader = new Reader(view);
			const message: Partial<T> = {};

			const fieldsArray = Object.entries<PBMessageFieldEntry<T>>(fields).map(([name, field]) => ({
				name: name as keyof T,
				...field
			}));

			while (!reader.isExhausted()) {
				const tag = Number(reader.getVarInt());
				const field = fieldsArray.find(f => f.id == tag >> 3);
				if (!field || !verifyType(tag, field.value[0])) break;

				const fieldType = field.value;

				const [success, value] = readValue(reader, fieldType);
				if (!success) break;

				if (fieldType[2]) {
					if (!message[field.name]) (message as any)[field.name] = [];
					(message[field.name] as any[]).push(value);
				} else {
					message[field.name] = value;
				}
			}

			return message;
		}
	];
}

export function parseProtobuf<T>(data: Uint8Array, type: PBValue<T>): T {
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	return type[1](view);
}
