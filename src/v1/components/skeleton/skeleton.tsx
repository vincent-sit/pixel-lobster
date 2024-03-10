import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100%;
    position: relative;
`;

const SidePanel = styled.div`
    background-color: green;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
`;

const ToolBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
`;

const DisplayWrapper = styled.div`
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
`;

const CommandPanel = styled.div`
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    display: flex;
    gap: 20px;
`;

type SkeletonProps = {
    Display : React.ComponentType,
    ExportCanvasButton : React.ComponentType,
    ClearCanvasButton : React.ComponentType,
    ResizeCanvasButton : React.ComponentType,
    ColorPicker : React.ComponentType,
    EraserButton : React.ComponentType,
    PaintbrushButton : React.ComponentType,
    ColorPickerButton : React.ComponentType,
    ColorHistory : React.ComponentType,
    ResizeDialog : React.ComponentType
};

export function Skeleton({
    Display, 
    ResizeDialog, 
    ExportCanvasButton, 
    ClearCanvasButton,
    ResizeCanvasButton,
    ColorPicker,
    EraserButton,
    PaintbrushButton,
    ColorPickerButton,
    ColorHistory
}: SkeletonProps) {
    // const snap = useSnapshot(ResizeState);

    return (
        <Layout>
            <SidePanel>
                <ToolBar>
                    <PaintbrushButton/>
                    <EraserButton/>
                    <ColorPickerButton/>
                </ToolBar>
                <ColorPicker/>
                <ColorHistory/>
            </SidePanel>
            <DisplayWrapper>
                <Display/>
            </DisplayWrapper>

            <CommandPanel>
                <ExportCanvasButton/>
                <ClearCanvasButton/>
                <ResizeCanvasButton/>
            </CommandPanel>

            {/* { snap.store.isDialogActive && <StyledBackdrop/> } */}
            <ResizeDialog/>
        </Layout>
    );
}
