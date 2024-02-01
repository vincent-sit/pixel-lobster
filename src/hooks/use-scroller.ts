import {RefObject, useEffect, useRef, useState} from 'react';
import { isWithinBounds } from '../utils/ui-check';

type ScrollerState = {
    x : number;
    y: number;
    isScrolling: boolean;
    scrollSpeed: number;
}

export function useScroller(ref? : RefObject<HTMLElement>) {
    const [state, setState] = useState<ScrollerState>({
        x: 0,
        y: 0,
        isScrolling: false,
        scrollSpeed: 2
    });

    const isWithinRef = useRef(false);

    const element = ref?.current ? ref.current : document.body;

    // deltaY returns positve if scrolling down, otherwise negative if scrolling up
    const wheelScroll = (e: WheelEvent) => {
        const rect = element.getBoundingClientRect();
        if (!isWithinBounds(e, rect)) return;

        isWithinRef.current = true;

        setState((prev) => ({
            ...prev,
            x: e.clientX - rect.x,
            y: e.clientY - rect.y,
            isScrolling: true
        }));
    };

    useEffect(() => {
        if (ref && !ref.current) return;
    }, []);
    
    return () => {        
    }
}
