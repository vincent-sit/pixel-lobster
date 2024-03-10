import React from 'react';
import { StyledAlertDialog, ResizeContent, Title, SizeInputWrapper } from '../../../ui-style/alert-dialog/alert-dialog';
import { installResizeButtons } from '../resize-button/install';
import { installResizeInput } from '../resize-input/install';
import { InputState } from '../resize-input/input-model';
import { useSnapshot } from 'valtio';

export function ResizeDialog() {
    // snap shot is necessary for the inputs to not lose focus
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const inputSnap = useSnapshot(InputState);
    const { SubmitButton, CancelButton } = installResizeButtons();
    const { WidthInput, HeightInput } = installResizeInput();

    return (
        <StyledAlertDialog>
            <ResizeContent>
                <Title style={{color:'black', alignSelf:'center'}}>
                    Resize the Canvas
                </Title>
                <SizeInputWrapper style={{gridColumnStart:'2', gridColumnEnd: '4', gridRow:'2', alignSelf:'start'}}>
                    {WidthInput()}
                    <span>x</span>
                    {HeightInput()}
                </SizeInputWrapper>
                <SubmitButton/>
                <CancelButton/>
            </ResizeContent>
        </StyledAlertDialog>
    );
}
