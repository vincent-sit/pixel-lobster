import Color from 'colorjs.io/types';
import React, {createContext, useState} from 'react';

interface ColorHistoryData {
    colors : Color[];
    // eslint-disable-next-line no-unused-vars
    updateColors : (newColorHistory : Color[]) => void;
}

const COLOR_HISTORY_LIMIT = 20;

export const ColorHistoryContext = createContext<ColorHistoryData>({
    colors: [],
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    updateColors: (newColorHistory : Color[]) => {}
});

export const ColorHistoryProvider = (props : {children : React.ReactNode}) => {
    const [colors, setColors] = useState(new Array<Color>());

    const updateColors = (newColorHistory : Color[]) => {
        if (newColorHistory.length > COLOR_HISTORY_LIMIT) {
            newColorHistory.splice(0, 1);
        }
        setColors(newColorHistory);
    };

    return (
        <ColorHistoryContext.Provider value = {{colors, updateColors}}>
            {props.children}
        </ColorHistoryContext.Provider>
    );
};
