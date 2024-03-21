import { EraserTool } from './eraser/tool';
import { PaintBrushTool } from './paint-brush/tool';
import { EyeDropperTool } from './eye-dropper/tool';

export type BaseTool = {
    down?: (x: number, y: number) => void;
    up?: (x: number, y: number) => void;
    move?: (x: number, y: number) => void;
};

export type Tool = PaintBrushTool | EraserTool | EyeDropperTool;

export interface Point {
    x : number,
    y : number
}
