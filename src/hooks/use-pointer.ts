import { RefObject, useEffect, useState } from 'react';

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

    useEffect(() => {
        if (ref && !ref.current) {
            return;
        }
        
        // If no ref passed, default to document.body
        const element = ref?.current ? ref.current : document.body;

        const handlePointer = (e: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            setState({
                isDown: e.pressure > 0,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y,
            });
        };

        element.addEventListener('pointerdown', handlePointer);
        element.addEventListener('pointerup', handlePointer);
        element.addEventListener('pointermove', handlePointer);

        return () => {
            element.removeEventListener('pointerdown', handlePointer);
            element.removeEventListener('pointerup', handlePointer);
            element.removeEventListener('pointermove', handlePointer);
        };
    }, []);

    return state;
}
