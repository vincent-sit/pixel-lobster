/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';

interface IsDialogActiveData {
    isDialogActive : boolean;
    setIsDialogActive: (newState : boolean) => void;
}

export const DialogContext = createContext<IsDialogActiveData>({
    isDialogActive: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsDialogActive: (newState : boolean) => {}
});

export const DialogProvider = (props: {children : React.ReactNode}) => {
    const [isDialogActive, setIsDialogActive] = useState(false);
    
    return (
        <DialogContext.Provider value = {{isDialogActive, setIsDialogActive}}>
            {props.children}
        </DialogContext.Provider>
    );
};
