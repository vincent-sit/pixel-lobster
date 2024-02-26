import React from 'react';
import { styled } from 'styled-components';
import { ToolBar } from '../tool-bar/tool-bar';
import { Display } from '../display/display';

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    height: 100%;
`;

const BodyWrapper = styled.div`
    height: 100%;    
`;

export function AppBody() {
    return (
        <BodyWrapper>
            <Layout>
                <ToolBar/>
                <Display/>
            </Layout>
        </BodyWrapper>
    );
}
