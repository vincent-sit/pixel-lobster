import { RefObject, useEffect, useState, useRef } from 'react';
import { clamp } from '../utils/math';

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

        const handleUp = () => {
            isWithinRef.current = false;
            setState((prev) => ({
                ...prev,
                isDown: false,
            }));
        };

        const handleMove = (e: PointerEvent) => {
            if (!isWithinRef.current) return;
            const rect = element.getBoundingClientRect();
            setState({
                isDown: e.pressure > 0,
                x: clamp(e.clientX - rect.x, 0, rect.width),
                y: clamp(e.clientY - rect.y, 0, rect.height),
            });
        };

        document.body.addEventListener('pointerdown', handleDown);
        document.body.addEventListener('pointerup', handleUp);
        document.body.addEventListener('pointermove', handleMove);

        return () => {
            document.body.removeEventListener('pointerdown', handleDown);
            document.body.removeEventListener('pointerup', handleUp);
            document.body.removeEventListener('pointermove', handleMove);
        };
    }, []);

    return state;
}
