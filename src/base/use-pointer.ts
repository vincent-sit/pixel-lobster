import { RefObject, useEffect, useState } from 'react';

const isWithinBounds = (x: number, y: number, rect: DOMRect) => {
    return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
};

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
        const target = ref?.current ? ref.current : document.body;

        const handleDown = (e: PointerEvent) => {
            const rect = target.getBoundingClientRect();
            if (!isWithinBounds(e.clientX, e.clientY, rect)) return;

            setState({
                isDown: e.pressure > 0,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y,
            });
        };

        const handleUp = () => {
            setState((prev) => ({
                ...prev,
                isDown: false,
            }));
        };

        const handleMove = (e: PointerEvent) => {
            const rect = target.getBoundingClientRect();
            setState((prev) => ({
                isDown: prev.isDown,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y,
            }));
        };

        document.body.addEventListener('pointerdown', handleDown);
        document.body.addEventListener('pointerup', handleUp);
        document.body.addEventListener('pointermove', handleMove);

        return () => {
            document.body.removeEventListener('pointerdown', handleDown);
            document.body.removeEventListener('pointerup', handleUp);
            document.body.removeEventListener('pointermove', handleMove);
        };
    }, [ref]);

    return state;
}
