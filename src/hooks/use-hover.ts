import { RefObject, useEffect, useState, useRef } from 'react';
import { isWithinBounds } from '../utils/ui-check';

type HoverState = {
    isHovering : boolean;
    x: number;
    y: number;
};

export function useHover(ref?: RefObject<HTMLElement>) {
    const [state, setState] = useState<HoverState>({
        isHovering : false,
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

        const handleHover = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            if (!isWithinBounds(e, rect)) return;
            
            isWithinRef.current = true;

            setState({
                isHovering : true,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y
            });
        };

        const handleLeave = () => {
            isWithinRef.current = false;
            setState((prev) => ({
                ...prev,
                isHovering: false
            }));
        };

        document.body.addEventListener('mouseover', handleHover);
        document.body.addEventListener('mouseout', handleLeave);

        return () => {
            document.body.removeEventListener('pointerdown', handleHover);
            document.body.removeEventListener('pointerup', handleLeave);
        };
    }, []);

    return state;
}
