import React from 'react';
import styled from 'styled-components';
import { StyledBackdrop } from '../../ui-style/alert-dialog/backdrop';
import { ResizeState } from '../resize/model';
import { useSnapshot } from 'valtio';

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
    ResizeDialog : React.ComponentType,
    ExportCanvasButton : React.ComponentType,
    ClearCanvasButton : React.ComponentType
    ColorPicker : React.ComponentType
};

export function Skeleton({
    Display, ResizeDialog, ExportCanvasButton, ClearCanvasButton, ColorPicker
}: SkeletonProps) {
    const snap = useSnapshot(ResizeState);

    return (
        <Layout>
            <SidePanel>
                <ColorPicker/>
            </SidePanel>
            <DisplayWrapper>
                <Display/>
            </DisplayWrapper>

            <CommandPanel>
                <ExportCanvasButton/>
                <ClearCanvasButton/>
            </CommandPanel>

            { snap.store.isDialogActive && <StyledBackdrop/> }
            { snap.store.isDialogActive && <ResizeDialog/> }
        </Layout>
    );
}
