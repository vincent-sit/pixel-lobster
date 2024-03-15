import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ButtonWrapper } from '../../../ui-style/button';

const StyledDialog = styled.dialog`
    position: fixed;
    background-color: white;
    width: 20%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    z-index: 1;
    text-align: center;

    &::backdrop {
        background-color: black;
        opacity: 0.7;
    }

    @media (min-width: 600px) {
        .Modal {
            width: 500px;
            left: calc(50% - 250px);
        }
    }
`;

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
    getCanvasSize: () => ({width : number, height : number}),
    isOpen : boolean,
    onSubmit : (newWidth : number, newHeight : number) => void,
    onCloseClick : () => void
}

export function ResizeDialog({getCanvasSize, isOpen, onSubmit, onCloseClick} : ResizeDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [ width, setWidth ] = useState(0);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        if (!dialogRef.current) return;

        if (isOpen) {
            const size = getCanvasSize();
            setWidth(size.width);
            setHeight(size.height);
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen, getCanvasSize]);

    const onChange = (e : React.ChangeEvent<HTMLInputElement>, 
        setState : React.Dispatch<React.SetStateAction<number>>) => 
    {
        let numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (!numericValue) numericValue = '0';
        setState(parseInt(numericValue));
    };

    return (
        <StyledDialog ref={dialogRef}>
            <ResizeContent>
                <Title>Resize Canvas</Title>
                <StyledForm>
                    <InputLabel htmlFor='w'>
                        <span>W</span>
                        <input 
                            id='w' name='width' type="text"
                            value={ width.toString() }
                            onChange={ (e) => onChange(e, setWidth) }
                            style={{ width: '25px', textAlign: 'center' }}
                        />
                    </InputLabel>
                    <span>x</span>
                    <InputLabel htmlFor='h'>H
                        <input
                            id='h' name='height' type="text"
                            value={ height.toString() }
                            onChange={ (e) => onChange(e, setHeight) }
                            style={{ width: '25px', textAlign: 'center' }}
                        />
                    </InputLabel>
                </StyledForm>
                <ButtonWrapper 
                    onClick={() => onSubmit(width, height)}
                    style={{gridColumnStart:'1', gridColumnEnd:'3', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                    autoFocus
                >
                    Confirm
                </ButtonWrapper>
                <ButtonWrapper 
                    onClick={onCloseClick}
                    style={{gridColumnStart:'4', gridColumnEnd:'6', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                >
                    Close
                </ButtonWrapper>
            </ResizeContent>
        </StyledDialog>
    );
}
