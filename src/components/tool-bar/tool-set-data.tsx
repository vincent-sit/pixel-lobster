import { TOOL } from '../../contexts/tool-context';
import paintBrushUrl from '../../assets/paintbrush.png';
import eraserUrl from '../../assets/eraser.png';
import pickerUrl from '../../assets/colorPicker.png';

export const ToolSetData = [
    {tool: TOOL.PAINTBRUSH, imageLink: paintBrushUrl, altText: 'Paint Brush'},
    {tool: TOOL.ERASER, imageLink: eraserUrl, altText: 'Eraser'},
    {tool: TOOL.COLORPICKER, imageLink: pickerUrl, altText: 'Color Picker'},
];
