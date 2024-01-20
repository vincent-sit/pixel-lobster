import React, {createContext, useState} from 'react';
import Color from 'colorjs.io';

interface ColorContextData {
  color: Color;
  // eslint-disable-next-line no-unused-vars
  updateColor: (newColor : Color) => void;
}

export const ColorContext = createContext<ColorContextData>( {
    color: new Color('black'),
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    updateColor: (newColor : Color) => {}
});

// annotating props instead of using ReactFC to indicate typing
export const ColorProvider = (props: { children : React.ReactNode } ) => {
    const [color, setColor] = useState(new Color('black'));

    const updateColor = (newColor : Color) => {
        setColor(newColor);
    };

    return (
        <ColorContext.Provider value={{ color, updateColor }} >
            {props.children}
        </ColorContext.Provider>
    
    );
};
