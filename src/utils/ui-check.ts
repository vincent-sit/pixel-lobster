export const isWithinBounds = (e: MouseEvent, rect : DOMRect) => {    
    return (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
};
