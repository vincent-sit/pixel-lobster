import { TOOL } from '../../contexts/tool-context';
import paintBrushUrl from '../../assets/paintbrush.png';

export const ToolSet = [
    {tool: TOOL.PAINTBRUSH, imageLink: paintBrushUrl, altText: 'Paint Brush'},
    {tool: TOOL.ERASER, imageLink: paintBrushUrl, altText: 'Eraser'},
    {tool: TOOL.COLORPICKER, imageLink: paintBrushUrl, altText: 'Color Picker'},
];
