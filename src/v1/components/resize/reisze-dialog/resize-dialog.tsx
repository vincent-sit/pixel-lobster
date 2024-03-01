import React from 'react';
import { StyledAlertDialog, ResizeContent, Title, SizeInputWrapper } from '../../../ui-style/alert-dialog/alert-dialog';
import { ResizeInput } from '../resize-input/resize-input';
import { useSnapshot } from 'valtio';
import { ResizeState } from '../model';
import { Button } from '../../../ui-style/button/ui';
import { InputState } from '../resize-input/input-model';

export function ResizeDialog() {
    const inputSnap = useSnapshot(InputState);

    return (
        <StyledAlertDialog>
            <ResizeContent>
                <Title style={{color:'black', alignSelf:'center'}}>
                    Resize the Canvas
                </Title>
                <SizeInputWrapper style={{gridColumnStart:'2', gridColumnEnd: '4', gridRow:'2', alignSelf:'start'}}>
                    <ResizeInput id='width' innerText='W' innerValue={inputSnap.store.width} onChange={InputState.setWidth}/>
                    <span>x</span>
                    <ResizeInput id='height' innerText='H' innerValue={inputSnap.store.height} onChange={InputState.setHeight}/>
                </SizeInputWrapper>
                <Button 
                    onClick={() => {
                        ResizeState.updateSize(parseInt(InputState.store.width, 10), parseInt(InputState.store.height, 10));
                        ResizeState.toggleDialog('off');
                    }}
                    style={{gridColumnStart:'1', gridColumnEnd:'3', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                >
                    Confirm
                </Button>
                <Button
                    onClick={() => ResizeState.toggleDialog('off')}
                    style={{gridColumnStart:'3', gridColumnEnd:'5', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                >
                    Cancel
                </Button>
            </ResizeContent>
        </StyledAlertDialog>
    );
}
