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
`;

type SkeletonProps = {
    Display : React.ComponentType
};

export function Skeleton({
    Display
}: SkeletonProps) {
    return (
        <Layout>
            <SidePanel>
                <p>Hello World</p>
            </SidePanel>
            
            <DisplayWrapper>
                <Display/>
            </DisplayWrapper>

            <CommandPanel>
                <p>Hello World</p>
            </CommandPanel>
        </Layout>
    );
}
