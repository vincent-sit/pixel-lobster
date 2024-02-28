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
    height: 100%;
`;

const Display = styled.div`
    background-color: blue;
    height: 100%;
`;

const CommandPanel = styled.div`
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
`;

export function Skeleton() {
    return (
        <Layout>
            <SidePanel>
                <p>Hello World</p>
            </SidePanel>

            <Display>
                <p>Hello World</p>
            </Display>

            <CommandPanel>
                <p>Hello World</p>
            </CommandPanel>
        </Layout>
    );
}
