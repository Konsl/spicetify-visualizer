import { createContext } from "react";

export type ErrorHandler = (msg: string, recovery: ErrorRecovery) => void;

export const ErrorHandlerContext = createContext<ErrorHandler>(() => {});

export enum ErrorRecovery {
	MANUAL,
	SONG_CHANGE,
	NONE
}

export type ErrorData = {
	message: string;
	recovery: ErrorRecovery;
};
