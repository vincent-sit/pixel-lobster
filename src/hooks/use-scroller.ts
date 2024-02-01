import {RefObject, useState} from 'react';

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

    const isWtithinRef = useRef(false);
    
    return () => {        
    }
}
