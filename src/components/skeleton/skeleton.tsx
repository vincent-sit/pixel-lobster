import React from 'react';
import styled from 'styled-components';
import { UndoButton } from '../operation-history/button/undo-button';
import { RedoButton } from '../operation-history/button/redo-button';

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
    Display: React.ComponentType;
    ExportButton: React.ComponentType;
    ClearButton: React.ComponentType;
    ResizeButton: React.ComponentType;
    UndoButton: React.ComponentType;
    RedoButton: React.ComponentType;
    ColorPicker: React.ComponentType;
    ColorHistory: React.ComponentType;
    ToolBar: React.ComponentType;
};

export function Skeleton({
    Display,
    ExportButton,
    ClearButton,
    ResizeButton,
    UndoButton,
    RedoButton,
    ColorPicker,
    ColorHistory,
    ToolBar,
}: SkeletonProps) {
    return (
        <Layout>
            <SidePanel>
                <ToolBar />
                <ColorPanel>
                    <ColorPicker />
                    <ColorHistory />
                </ColorPanel>
            </SidePanel>
            <DisplayWrapper>
                <Display />
            </DisplayWrapper>

            <CommandPanel>
                <ExportButton />
                <ClearButton />
                <ResizeButton />
                <UndoButton/>
                <RedoButton/>
            </CommandPanel>

            <OverlayRow style={{ top: 0 }} />
            <OverlayRow style={{ bottom: 0 }} />
            <OverlayColumn style={{ right: 0 }} />
        </Layout>
    );
}
