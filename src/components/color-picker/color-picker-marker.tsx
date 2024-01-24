import React, { useEffect, useRef, useState } from 'react';
import { ColorPickerChild, Coord } from './color-picker';

export interface IColorProps {
    canvasHeight?: number | undefined,
    coordX : number,
    coordY : number, 
    componentW: number,
    componentL : number
}

export function ColorPickerMarker(props: IColorProps) {
    const colorCoordCircleRef = useRef<HTMLCanvasElement>(null);
    const [markerPrevCoord, setMarkerPrevCoord] = useState<Coord>({x: 0, y: 0});

    function drawPositionMarker(x: number, y: number, color?: string) {
        if (!colorCoordCircleRef.current) return;
        
        const currCoordCtx = colorCoordCircleRef.current.getContext('2d');

        if (!currCoordCtx) return;
        currCoordCtx.beginPath();
        currCoordCtx.arc(x + 5, y, 5, 0, 2 * Math.PI);
        if (color) currCoordCtx.strokeStyle = color;
        currCoordCtx.stroke();
        currCoordCtx.closePath();        
    }

    useEffect(()=> {
        if (!colorCoordCircleRef.current) return;

        const currCoordCtx = colorCoordCircleRef.current.getContext('2d');

        if (!currCoordCtx) return;
        // look up the size the canvas is being displayed
        const width = currCoordCtx.canvas.clientWidth;
        const height = currCoordCtx.canvas.clientHeight;
        
        // If it's resolution does not match change it
        if (currCoordCtx.canvas.width !== width || currCoordCtx.canvas.height !== height) {
            currCoordCtx.canvas.width = width;
            currCoordCtx.canvas.height = height;
        }
        drawPositionMarker(props.coordX, props.coordY);
        setMarkerPrevCoord({x: props.coordX, y: props.coordY});
    }, []);

    // // set color selection coord and draw circle
    useEffect(() => {
        if (!props.canvasHeight || !colorCoordCircleRef.current) return;
        
        const indicatorCtx = colorCoordCircleRef.current.getContext('2d');

        if (indicatorCtx) {
            indicatorCtx.clearRect(markerPrevCoord.x - 5, markerPrevCoord.y, indicatorCtx.canvas.width, indicatorCtx.canvas.height);
            if (props.coordY >= props.canvasHeight / 2) {
                drawPositionMarker(props.coordX, props.coordY, 'white');
            } else {
                drawPositionMarker(props.coordX, props.coordY, 'black');
            }
        }

    }, [props.coordX, props.coordY]);

    return (
        <ColorPickerChild $left={props.componentL} $width={props.componentW} ref={colorCoordCircleRef} width={props.componentW} height='300px'/>
    );
}
