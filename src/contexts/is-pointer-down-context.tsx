/* eslint-disable no-unused-vars */
import React, {createContext, useState} from 'react';

interface IsPointerDownContextData {
    isPointerDown : boolean;
    setIsPointerDown : (currPointerStatus : boolean) => void;
}

export const IsPointerDownContext = createContext<IsPointerDownContextData>( {
    isPointerDown: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsPointerDown(currPointerStatus) {}
});

export const IsPointerDownProvider = (props: {children : React.ReactNode}) => {
    const [isPointerDown, setIsPointerDownState] = useState(false);

    const setIsPointerDown = (currPointerStatus : boolean) => {
        setIsPointerDownState(currPointerStatus);
    };

    return (
        <IsPointerDownContext.Provider value={{isPointerDown, setIsPointerDown}}>
            {props.children}
        </IsPointerDownContext.Provider>
    );
};
