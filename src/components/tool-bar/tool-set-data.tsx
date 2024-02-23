import { TOOL } from '../../contexts/tool-context';
import paintBrushUrl from '../../assets/paintbrush.png';
import eraserUrl from '../../assets/eraser.png';
import pickerUrl from '../../assets/colorPicker.png';

export const ToolSetData = [
    {tool: TOOL.PAINTBRUSH, imageLink: paintBrushUrl, altText: 'Paint Brush', isPressed: true},
    {tool: TOOL.ERASER, imageLink: eraserUrl, altText: 'Eraser', isPressed: false},
    {tool: TOOL.COLORPICKER, imageLink: pickerUrl, altText: 'Eye Dropper', isPressed: false},
];
