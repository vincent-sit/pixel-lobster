/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';

export interface IDimensionData {
    x : number;
    y: number;
}

interface DimensionContextData {
    dimension : IDimensionData;
    updateDimension: (newDimensions : IDimensionData) => void;
}

export const DimensionContext = createContext<DimensionContextData>({
    dimension : { x : 0, y : 0 },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDimension: (newDimension : IDimensionData) => {}
});

export const DimensionProvider = (props: {children : React.ReactNode}) => {
    const [dimension, setDimension] = useState({x: 0, y: 0});
    
    const updateDimension = (newDimension : IDimensionData) => {
        setDimension(newDimension);
    };

    return (
        <DimensionContext.Provider value = {{dimension, updateDimension}}>
            {props.children}
        </DimensionContext.Provider>
    );
};
