import React, { useContext, useRef } from 'react';
import { StyledAlertDialog } from '../../ui-style/alert-dialog';
import { ButtonWrapper } from '../../ui-style/button';
import { DialogContext } from '../../contexts/dialog-context';
import styled from 'styled-components';
import { CanvasSizeInput } from './canvas-dimension-input';
import { DimensionContext } from '../../contexts/dimension-context';

const ResizeContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
`;

const Title = styled.span`
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
`;

const SizeInputWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    gap: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export function ResizeDialog() {
    const { setIsDialogActive } = useContext(DialogContext);
    const {dimension, updateDimension} = useContext(DimensionContext);
    const widthInputRef = useRef<HTMLInputElement>(null);
    const heightInputRef = useRef<HTMLInputElement>(null);

    function onClick() {
        setIsDialogActive(false);
    }

    function submit() {
        setIsDialogActive(false);
        if (!widthInputRef.current || !heightInputRef.current) return;
        updateDimension({
            width: parseInt(widthInputRef.current.value, 10),
            height: parseInt(heightInputRef.current.value, 10)
        });
    }

    return (
        <StyledAlertDialog>
            <ResizeContent>
                <Title style={{color:'black', alignSelf:'center'}}>
                    Resize the Canvas
                </Title>
                <SizeInputWrapper style={{gridColumnStart:'2', gridColumnEnd: '4', gridRow:'2', alignSelf:'start'}}>
                    <CanvasSizeInput id='width' innerText='W' value={dimension.width.toString()} ref={widthInputRef}/>
                    <span>x</span>
                    <CanvasSizeInput id='height' innerText='H' value={dimension.height.toString()} ref={heightInputRef}/>
                </SizeInputWrapper>
                <ButtonWrapper 
                    onClick={submit}
                    style={{gridColumnStart:'1', gridColumnEnd:'3', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                >
                    Confirm
                </ButtonWrapper>
                <ButtonWrapper 
                    onClick={onClick} 
                    style={{gridColumnStart:'3', gridColumnEnd:'5', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                >
                    Cancel
                </ButtonWrapper>
            </ResizeContent>
        </StyledAlertDialog>
    );
}
