import { RefObject, useEffect, useState, useRef } from 'react';

type PointerState = {
    isDown: boolean;
    x: number;
    y: number;
};

export function usePointer(ref?: RefObject<HTMLElement>) {
    const [state, setState] = useState<PointerState>({
        isDown: false,
        x: 0,
        y: 0,
    });

    const isWithinRef = useRef(false);

    useEffect(() => {
        if (ref && !ref.current) {
            return;
        }
        
        // If no ref passed, default to document.body
        const element = ref?.current ? ref.current : document.body;                

        const calculateCoordWithinBounds = (e: PointerEvent) => {
            const rect = element.getBoundingClientRect();

            if (isWithinBounds(e)) {
                return {
                    x: e.clientX - rect.x,
                    y: e.clientY - rect.y
                };
            }

            const newX = e.clientX > rect.right ? rect.width : e.clientX < rect.x ? 0 : e.clientX - rect.x;
            const newY = e.clientY > rect.bottom ? rect.height : e.clientY < rect.y ? 0 : e.clientY - rect.y;
            return {
                x : newX,
                y : newY
            };
        };

        const isWithinBounds = (e: PointerEvent) => {
            const rect = element.getBoundingClientRect();            
            return (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
        };

        const handleDown = (e: PointerEvent) => {                                    
            if (!isWithinBounds(e)) return;                    

            isWithinRef.current = true;
            
            const rect = element.getBoundingClientRect();            
            
            setState({
                isDown: e.pressure > 0,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y
            });
        };

        const handleUp = (e: PointerEvent) => {
            if (!isWithinRef.current) return;
            isWithinRef.current = false;
            const newCoord = calculateCoordWithinBounds(e);            
            setState({
                isDown: e.pressure > 0,
                x: newCoord.x,
                y: newCoord.y
            });            
        };

        const handlePointer = (e: PointerEvent) => {            
            if (!isWithinRef.current) return;            
            const newCoord = calculateCoordWithinBounds(e);            
            setState({
                isDown: e.pressure > 0,
                x: newCoord.x,
                y: newCoord.y
            });            
        };

        document.body.addEventListener('pointerdown', handleDown);
        document.body.addEventListener('pointerup', handleUp);
        document.body.addEventListener('pointermove', handlePointer);

        return () => {
            document.body.removeEventListener('pointerdown', handlePointer);
            document.body.removeEventListener('pointerup', handlePointer);
            document.body.removeEventListener('pointermove', handlePointer);
        };
    }, []);

    return state;
}
