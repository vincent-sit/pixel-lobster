import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { ToolBar } from '../tool-bar/tool-bar';
import { Display } from '../display/display';
import { IsPointerDownContext } from '../../contexts/is-pointer-down-context';

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;    
    height: 100%;  
`;

const BodyWrapper = styled.div`
    height: 100%;
`;

export function AppBody() {
    const {setIsPointerDown} = useContext(IsPointerDownContext);

    function handlePointerDown() {
        setIsPointerDown(true);
    }

    function handlePointerUp() {
        setIsPointerDown(false);
    }

    return (        
        <BodyWrapper onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>                        
            <Layout>
                <ToolBar/>
                <Display/>    
            </Layout>            
        </BodyWrapper>
    );
}
