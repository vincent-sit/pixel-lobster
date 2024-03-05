import { PaintBrushPresenter } from './presenter';

export function installPaintBrush() {
    const presenter = new PaintBrushPresenter();
    const draw = 
        (e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) => 
            presenter.draw(e, color, zoomFactor, canvas);

    return {
        draw
    };
}
