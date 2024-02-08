import {RefObject, useEffect, useRef, useState} from 'react';
import { isWithinBounds } from '../utils/ui-check';

type ScrollerState = {
    x : number;
    y: number;    
    scrollSpeed: number;
    zoomFactor : number;
}

export function useScroller(ref? : RefObject<HTMLElement>) {
    const [state, setState] = useState<ScrollerState>({
        x: 0,
        y: 0,        
        scrollSpeed: 2,
        zoomFactor : 16
    });

    const isWithinRef = useRef(false);

    useEffect(() => {        
        if (ref && !ref.current) return;

        const element = ref?.current ? ref.current : document.body;

        // deltaY returns positve if scrolling down, otherwise negative if scrolling up
        const wheelScroll = (e: WheelEvent) => {            
            const rect = element.getBoundingClientRect();            
            if (!isWithinBounds(e, rect)) return;
    
            isWithinRef.current = true;

            const scrollDistance = 
                e.deltaY === 0 ? 0 : e.deltaY < 0 ? state.scrollSpeed : -state.scrollSpeed;
            
            setState((prev) => ({
                ...prev,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y,
                zoomFactor : prev.zoomFactor + scrollDistance > -1 ? prev.zoomFactor + scrollDistance : -1
            }));            
        };
        
        element.addEventListener('wheel', wheelScroll);

        return () => {
            element.removeEventListener('wheel', wheelScroll);
        };
    }, []);
    
    return state;
}
