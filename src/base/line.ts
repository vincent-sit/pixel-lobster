// Bresenham's line algorithm
// Adapted from https://saturncloud.io/blog/bresenham-line-algorithm-a-powerful-tool-for-efficient-line-drawing/
export function line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    cb: (x: number, y: number) => void
) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    const slope = dy > dx;

    if (slope) {
        let t = x1;
        x1 = y1;
        y1 = t;
        t = x2;
        x2 = y2;
        y2 = t;
    }

    if (x1 > x2) {
        let t = x1;
        x1 = x2;
        x2 = t;
        t = y1;
        y1 = y2;
        y2 = t;
    }

    dx = Math.abs(x2 - x1);
    dy = Math.abs(y2 - y1);
    let error = dx; // 2
    let drawY = y1;
    const ystep = y1 < y2 ? 1 : -1;

    for (let drawX = x1; drawX < x2 + 1; drawX++) {
        const coord = slope ? [drawY, drawX] : [drawX, drawY];
        cb(coord[0], coord[1]);
        error -= dy;
        if (error < 0) {
            drawY += ystep;
            error += dx;
        }
    }
}
