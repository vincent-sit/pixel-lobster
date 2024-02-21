/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';

export enum TOOL {
    PAINTBRUSH,
    ERASER,
    COLORPICKER,
}

interface ToolContextData {
    toolInUse : TOOL;    
    updateToolInUse: (newTool : TOOL) => void;
}

export const ToolContext = createContext<ToolContextData>({
    toolInUse : TOOL.PAINTBRUSH,    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateToolInUse: (newTool : TOOL) => {}
});

export const ToolProvider = (props: {children : React.ReactNode}) => {
    const [toolInUse, setToolInUse] = useState(TOOL.PAINTBRUSH);
    
    const updateToolInUse = (newTool : TOOL) => {
        setToolInUse(newTool);
    };

    return (
        <ToolContext.Provider value = {{toolInUse, updateToolInUse}}>
            {props.children}
        </ToolContext.Provider>
    );
};
