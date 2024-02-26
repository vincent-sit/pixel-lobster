import Color from 'colorjs.io/types';
import React, {createContext, useState} from 'react';

interface ColorHistoryData {
    colors : Color[];
    // eslint-disable-next-line no-unused-vars
    updateColors : (newColorHistory : Color[]) => void;
}

export const ColorHistoryContext = createContext<ColorHistoryData>({
    colors: [],
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    updateColors: (newColorHistory : Color[]) => {}
});

export const ColorHistoryProvider = (props : {children : React.ReactNode}) => {
    const [colors, setColors] = useState(new Array<Color>());

    const updateColors = (newColorHistory : Color[]) => {
        setColors(newColorHistory);
    };

    return (
        <ColorHistoryContext.Provider value = {{colors, updateColors}}>
            {props.children}
        </ColorHistoryContext.Provider>
    );
};
