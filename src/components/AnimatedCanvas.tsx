import React, { useRef, useEffect } from "react";

export default function AnimatedCanvas<T, U>(props: {
	onInit: (ctx: WebGL2RenderingContext | null) => U;
	onResize: (ctx: WebGL2RenderingContext | null, state: U) => void;
	onRender: (ctx: WebGL2RenderingContext | null, data: T, state: U, time: number) => void;

	data: T;
	isEnabled: boolean;
}) {
	const { onInit, onResize, onRender, data, isEnabled } = props;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stateRef = useRef<U | null>(null);

	useEffect(() => {
		if (!isEnabled || !onRender) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("webgl2");

		stateRef.current = onInit(context);
		onResize(context, stateRef.current);

		let requestId = 0;
		const wrapper = (time: number) => {
			if (!stateRef.current) return;

			onRender(context, data, stateRef.current, time);
			requestId = requestAnimationFrame(wrapper);
		};

		requestId = requestAnimationFrame(wrapper);
		return () => {
			if (requestId) cancelAnimationFrame(requestId);
			stateRef.current = null;
		};
	}, [onInit, onRender, data, isEnabled]);

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
			if (!context) return;

			if (stateRef.current) onResize(context, stateRef.current);
		});

		resizeObserver.observe(canvasRef.current);
		return () => resizeObserver.disconnect();
	}, [onResize, data]);

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
