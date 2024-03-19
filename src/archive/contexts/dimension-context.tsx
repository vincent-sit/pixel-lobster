/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';

export interface IDimensionData {
    width : number;
    height: number;
}

interface DimensionContextData {
    dimension : IDimensionData;
    updateDimension: (newDimensions : IDimensionData) => void;
}

export const DimensionContext = createContext<DimensionContextData>({
    dimension : { width : 16, height : 16 },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDimension: (newDimension : IDimensionData) => {}
});

export const DimensionProvider = (props: {children : React.ReactNode}) => {
    const [dimension, setDimension] = useState({ width : 16, height : 16 });
    
    const updateDimension = (newDimension : IDimensionData) => {
        setDimension(newDimension);
    };

    return (
        <DimensionContext.Provider value = {{dimension, updateDimension}}>
            {props.children}
        </DimensionContext.Provider>
    );
};
