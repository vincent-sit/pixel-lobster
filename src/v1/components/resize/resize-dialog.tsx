import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { DialogButton } from './dialog-button';
import { Dialog } from '../../ui/dialog/dialog';

const ResizeContent = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 0.5fr 1fr 1fr;
`;

const StyledForm = styled.form`
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const Title = styled.span`
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 1;
`;

const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

interface ResizeDialogProps {
    getCanvasSize: () => { width: number; height: number };
    isOpen: boolean;
    onSubmit: (newWidth: number, newHeight: number) => void;
    onCloseClick: () => void;
}

export function ResizeDialog({
    getCanvasSize,
    isOpen,
    onSubmit,
    onCloseClick,
}: ResizeDialogProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen) {
            const size = getCanvasSize();
            setWidth(size.width);
            setHeight(size.height);
        }
    }, [isOpen, getCanvasSize]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<number>>
    ) => {
        let numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (!numericValue) numericValue = '0';
        setState(parseInt(numericValue));
    };

    return (
        <Dialog isOpen={isOpen} onRequestClose={onCloseClick}>
            <ResizeContent>
                <Title>Resize Canvas</Title>
                <StyledForm>
                    <InputLabel htmlFor="w">
                        <span>W</span>
                        <input
                            id="w"
                            name="width"
                            type="text"
                            value={width.toString()}
                            onChange={(e) => onChange(e, setWidth)}
                            style={{ width: '25px', textAlign: 'center' }}
                        />
                    </InputLabel>
                    <span>x</span>
                    <InputLabel htmlFor="h">
                        H
                        <input
                            id="h"
                            name="height"
                            type="text"
                            value={height.toString()}
                            onChange={(e) => onChange(e, setHeight)}
                            style={{ width: '25px', textAlign: 'center' }}
                        />
                    </InputLabel>
                </StyledForm>
                <DialogButton
                    onClick={() => onSubmit(width, height)}
                    style={{
                        gridColumnStart: '1',
                        gridColumnEnd: '3',
                        gridRow: '3',
                        justifySelf: 'center',
                    }}
                    buttonShape="rectangle"
                    autoFocus
                >
                    Confirm
                </DialogButton>
                <DialogButton
                    onClick={onCloseClick}
                    style={{
                        gridColumnStart: '4',
                        gridColumnEnd: '6',
                        gridRow: '3',
                        justifySelf: 'center',
                    }}
                    buttonShape="rectangle"
                >
                    Close
                </DialogButton>
            </ResizeContent>
        </Dialog>
    );
}
