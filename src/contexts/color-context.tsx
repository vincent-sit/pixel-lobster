import React, {createContext, useState} from 'react';

interface ColorContextData {
  color: string;
  // eslint-disable-next-line no-unused-vars
  updateColor: (newColor : string) => void;
}

export const ColorContext = createContext<ColorContextData>( {
    color: 'black',
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    updateColor: (newColor : string) => {}
});

// annotating props instead of using ReactFC to indicate typing
export const ColorProvider = (props: { children : React.ReactNode } ) => {
    const [color, setColor] = useState('black');

    const updateColor = (newColor : string) => {
        setColor(newColor);
    };

    return (
        <ColorContext.Provider value={{ color, updateColor }} >
            <div>
                {props.children}
            </div>
        </ColorContext.Provider>
    
    );
};
