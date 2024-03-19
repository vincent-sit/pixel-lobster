import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { ToolBar } from '../tool-bar/tool-bar';
import { Display } from '../display/display';
import { StyledBackdrop } from '../../ui-style/backdrop';
import { DialogContext } from '../../contexts/dialog-context';
import { ResizeDialog } from '../canvas-dimension-control/canvas-dimension-dialog';

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    height: 100%;
`;

const BodyWrapper = styled.div`
    height: 100%;
`;

export function AppBody() {
    const { isDialogActive } = useContext(DialogContext);

    return (
        <BodyWrapper>
            {isDialogActive && <StyledBackdrop/>}
            <Layout>
                {isDialogActive && <ResizeDialog/>}
                <ToolBar/>
                <Display/>
            </Layout>
        </BodyWrapper>
    );
}
