import React, { useRef, useEffect, useState } from "react";

export default function AnimatedCanvas<T, U>(props: {
	onInit: (ctx: WebGL2RenderingContext | null) => U;
	onResize: (ctx: WebGL2RenderingContext | null, state: U) => void;
	onRender: (ctx: WebGL2RenderingContext | null, data: T, state: U, time: number) => void;

	data: T;
	isEnabled: boolean;
}) {
	const { onInit, onResize, onRender, data, isEnabled } = props;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [state, setState] = useState<U | null>(null);

	useEffect(() => {
		if (!onInit) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("webgl2");

		const state = onInit(context);
		onResize(context, state);
		setState(state);

		return () => setState(null);
	}, [onInit]);

	useEffect(() => {
		if (!isEnabled || !state || !onRender) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("webgl2");

		let requestId = 0;
		const wrapper = (time: number) => {
			if (!state) return;

			onRender(context, data, state, time);
			requestId = requestAnimationFrame(wrapper);
		};

		requestId = requestAnimationFrame(wrapper);
		return () => {
			if (requestId) cancelAnimationFrame(requestId);
		};
	}, [onRender, data, state, isEnabled]);

	useEffect(() => {
		if (!canvasRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const clientSize = Math.min(canvas.clientWidth, canvas.clientHeight);
			const screenSize = Math.round(clientSize * window.devicePixelRatio);

			if (canvas.width === screenSize && canvas.height === screenSize) return;
			canvas.width = canvas.height = screenSize;

			const context = canvas.getContext("webgl2");
			if (context && state) onResize(context, state);
		});

		resizeObserver.observe(canvasRef.current);
		return () => resizeObserver.disconnect();
	}, [onResize, state]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: "100%",
				height: "100%",
				objectFit: "contain",
				...(isEnabled ? {} : { display: "none" })
			}}
		/>
	);
}
