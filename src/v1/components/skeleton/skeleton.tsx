import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100%;
    position: relative;
`;

const SidePanel = styled.div`
    background-color: #201e30;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
`;

const ColorPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const ToolBar = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

const OverlayRow = styled.div`
    background-color: #201e30;
    position: fixed;
    width: 100%;
    height: 20px;
    z-index: 1;
`;

const OverlayColumn = styled.div`
    background-color: #201e30;
    position: fixed;
    height: 100%;
    width: 20px;
    z-index: 1;
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
    background-color: #201e30;
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    display: flex;
    gap: 20px;
    border-radius: 0 0 0 20px;
    z-index: 1;
`;

type SkeletonProps = {
    Display : React.ComponentType,
    ExportButton : React.ComponentType,
    ClearButton : React.ComponentType,
    ResizeButton : React.ComponentType,
    ColorPicker : React.ComponentType,
    EraserButton : React.ComponentType,
    PaintbrushButton : React.ComponentType,
    ColorPickerButton : React.ComponentType,
    ColorHistory : React.ComponentType
};

export function Skeleton({
    Display,
    ExportButton,
    ClearButton,
    ResizeButton,
    ColorPicker,
    EraserButton,
    PaintbrushButton,
    ColorPickerButton,
    ColorHistory
}: SkeletonProps) {

    return (
        <Layout>
            <SidePanel>
                <ToolBar>
                    <PaintbrushButton/>
                    <EraserButton/>
                    <ColorPickerButton/>
                </ToolBar>
                <ColorPanel>
                    <ColorPicker/>
                    <ColorHistory/>
                </ColorPanel>
            </SidePanel>
            <DisplayWrapper>
                <Display/>
            </DisplayWrapper>

            <CommandPanel>
                <ExportButton/>
                <ClearButton/>
                <ResizeButton/>
            </CommandPanel>

            <OverlayRow style={{top: 0}}/>
            <OverlayRow style={{bottom: 0}}/>
            <OverlayColumn style={{right: 0}}/>
        </Layout>
    );
}
