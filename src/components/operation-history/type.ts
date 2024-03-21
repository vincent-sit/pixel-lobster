export type Action = {
    redo : (canvas : HTMLCanvasElement) => void;
    undo : (canvas : HTMLCanvasElement) => void;
}
