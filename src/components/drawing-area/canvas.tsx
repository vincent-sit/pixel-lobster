import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';
import { ColorHistoryContext } from '../../contexts/color-history-context';
import { TOOL, ToolContext } from '../../contexts/tool-context';
import Color from 'colorjs.io';
import { DimensionContext } from '../../contexts/dimension-context';

// const COLOR_HISTORY_LIMIT = 20;

const Container = styled.div`
    transform-origin: center;
    position: relative;
`;

const CenteredCanvas = styled.canvas`
    position: absolute;

    &:hover {
        cursor: crosshair;
    }
`;

const Marker = styled.span`
    position: absolute;
    visibility: hidden;
    pointer-events: none;

    &:hover {
        cursor: crosshair;
    }
`;

interface DisplayProps {
    zoomFactor : number
}

export function Canvas(props: DisplayProps) {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundRef = useRef<HTMLCanvasElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);
    const { isDown, x: pointerX, y: pointerY } = usePointer(canvasRef);
    const { color, updateColor } = useContext(ColorContext);
    const { toolInUse } = useContext(ToolContext);
    const { colors: colorHistory, updateColors : setColorHistory } = useContext(ColorHistoryContext);
    const { dimension } = useContext(DimensionContext);

    useEffect(() => {
        if (!canvasRef.current || !backgroundRef.current) return;

        const currCtx = canvasRef.current.getContext('2d');
        const backgroundCtx = backgroundRef.current.getContext('2d');
        if (currCtx) {
            setCtx(currCtx);
            const imgData = currCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.width = dimension.width;
            canvasRef.current.height = dimension.height;
            currCtx.putImageData(imgData, 0, 0);
        }
        if (backgroundCtx) {
            backgroundCtx.clearRect(0, 0, dimension.width, dimension.height);
            const colorOne = 'rgba(138, 138, 138, 1)';
            const colorTwo = 'rgba(199, 199, 199, 1)';
            let isMainColor = true;
            for (let x = 0; x < dimension.width; x++) {
                if (dimension.height % 2 == 0) isMainColor = !isMainColor;
                for (let y = 0; y < dimension.height; y++) {
                    backgroundCtx.fillStyle = isMainColor ? colorOne : colorTwo;
                    backgroundCtx.fillRect(x, y, 1, 1);
                    isMainColor = !isMainColor;
                }
            }
        }
    }, [dimension]);

    function handleHover(e : React.MouseEvent<HTMLCanvasElement>) {
        if (!markerRef.current || !ctx || !canvasRef.current || toolInUse !== TOOL.PAINTBRUSH) return;
        const rect = canvasRef.current.getBoundingClientRect();
        markerRef.current.style.visibility = 'visible';
        markerRef.current.style.top = `${Math.floor((e.clientY - rect.y) / props.zoomFactor)}px`;
        markerRef.current.style.left = `${Math.floor((e.clientX - rect.x) / props.zoomFactor)}px`;
    }

    function handleLeave() {
        if (!markerRef.current) return;
        markerRef.current.style.visibility = 'hidden';
    }

    function handleMove() {
        if (!isDown || !ctx || !canvasRef.current) return;
        if (toolInUse === TOOL.PAINTBRUSH) {
            ctx.fillStyle = color.to('srgb').toString();
            ctx.fillRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);
        } else if (toolInUse === TOOL.ERASER) {            
            ctx.clearRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);
        }
    }

    function handleUp() {
        if (!isDown || !ctx || !canvasRef.current) return;
        if (toolInUse === TOOL.PAINTBRUSH) {
            const currentColorString = color.to('srgb').toString();
            ctx.fillStyle = currentColorString;
            ctx.fillRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);
            const colorSearchResult = colorHistory.find((element) => element.to('srgb').toString() === currentColorString);
            if (!colorSearchResult) {
                setColorHistory([
                    ...colorHistory,
                    color
                ]);
            }
        } else if (toolInUse === TOOL.ERASER) {            
            ctx.clearRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);
        } else if (toolInUse === TOOL.COLORPICKER) {
            const dataAtPixel = ctx.getImageData(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1).data;
            const rgbaString = `rgba(${dataAtPixel[0]},${dataAtPixel[1]},${dataAtPixel[2]},${dataAtPixel[3]})`;
            if (dataAtPixel[3] === 0) return;
            updateColor(new Color(rgbaString));
        }
    }

    return (
        <Container style={{ transform: `scale(${props.zoomFactor})`, width: dimension.width, height: dimension.height }}>
            <CenteredCanvas
                id='canvas-background'
                width={dimension.width} height={dimension.height}
                ref={backgroundRef}
                style={{imageRendering: 'pixelated'}}
            />
            <CenteredCanvas 
                ref={canvasRef}
                id='drawing-canvas'
                style={{imageRendering: 'pixelated'}}
                onPointerMove={handleMove}
                onPointerUp={handleUp}
                onMouseMove={handleHover}
                onMouseLeave={handleLeave}
            />
            <Marker 
                ref={markerRef}
                style={{ 
                    backgroundColor: `${color.to('srgb').toString()}`,
                    width: '1px',
                    height: '1px'}}
            />
        </Container>
    );
}
