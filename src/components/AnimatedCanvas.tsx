import React, { useRef, useEffect, useState, useCallback } from "react";

interface ContextTypeMap {
	"2d": CanvasRenderingContext2D;
	webgl: WebGLRenderingContext;
	webgl2: WebGL2RenderingContext;
	bitmaprenderer: ImageBitmapRenderingContext;
}

export default function AnimatedCanvas<T, U, V extends keyof ContextTypeMap>(props: {
	contextType: V;
	onInit: (ctx: ContextTypeMap[V] | null) => U;
	onResize: (ctx: ContextTypeMap[V] | null, state: U) => void;
	onRender: (ctx: ContextTypeMap[V] | null, data: T, state: U, time: number) => void;

	style?: React.CSSProperties;
	sizeConstraint?: (width: number, height: number) => { width: number; height: number };

	data: T;
	isEnabled: boolean;
}) {
	const { contextType, onInit, onResize, onRender, style, data, isEnabled } = props;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [state, setState] = useState<U | null>(null);

	const updateResolution = useCallback((canvas: HTMLCanvasElement, win: Window) => {
		const screenWidth = Math.round(canvas.clientWidth * window.devicePixelRatio);
		const screenHeight = Math.round(canvas.clientHeight * window.devicePixelRatio);

		const { width: newWidth, height: newHeight } = props.sizeConstraint?.(screenWidth, screenHeight) ?? {
			width: screenWidth,
			height: screenHeight
		};

		if (canvas.width === newWidth && canvas.height === newHeight) return;
		canvas.width = newWidth;
		canvas.height = newHeight;
	}, []);

	useEffect(() => {
		if (!onInit) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const win = canvas.ownerDocument.defaultView;
		if (!win) return;

		const context = canvas.getContext(contextType) as ContextTypeMap[V] | null;

		const state = onInit(context);
		updateResolution(canvas, win);
		onResize(context, state);
		setState(state);

		return () => setState(null);
	}, [contextType, onInit]);

	useEffect(() => {
		if (!isEnabled || !state || !onRender) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const win = canvas.ownerDocument.defaultView;
		if (!win) return;

		const context = canvas.getContext(contextType) as ContextTypeMap[V] | null;

		let requestId = 0;
		const wrapper = (time: number) => {
			if (!state) return;

			onRender(context, data, state, time);
			requestId = win.requestAnimationFrame(wrapper);
		};

		requestId = win.requestAnimationFrame(wrapper);
		return () => {
			if (requestId) win.cancelAnimationFrame(requestId);
		};
	}, [contextType, onRender, data, state, isEnabled]);

	useEffect(() => {
		if (!canvasRef.current) return;

		const win = canvasRef.current.ownerDocument.defaultView;
		if (!win) return;

		const resizeObserver = new win.ResizeObserver(() => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const win = canvas.ownerDocument.defaultView;
			if (!win) return;

			updateResolution(canvas, win);

			const context = canvas.getContext(contextType) as ContextTypeMap[V] | null;
			if (context && state) onResize(context, state);
		});

		resizeObserver.observe(canvasRef.current);
		return () => resizeObserver.disconnect();
	}, [contextType, onResize, state]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				...(style || {}),
				...(isEnabled ? {} : { visibility: "hidden" })
			}}
		/>
	);
}
