export type Operation = {
    type : OperationType;
    canvasImage : string;
    canvasWidth? : number;
    canvasHeight? : number;
    operate : (canvas : HTMLCanvasElement) => void;
}

export type OperationType = 'erase' | 'paint' | 'resize' | 'clear';