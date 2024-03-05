import { EraserPresenter } from './presenter';

export function installEraser() {
    const presenter = new EraserPresenter();
    const erase = 
        (e : React.PointerEvent<HTMLDivElement>, zoomFactor : number, canvas : HTMLCanvasElement) => 
            presenter.erase(e, zoomFactor, canvas);

    return {
        erase
    };
}
