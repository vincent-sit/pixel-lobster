import React from 'react';
import { ToolButton } from './tool-button';
import { ToolSet } from './tool-set';
import styled from 'styled-components';

const ButtonCollectionWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    
`;

export function ToolButtonCollection() {

    function Render() {
        const tools = ToolSet.map((tool) =>
            <ToolButton 
                key={`tool-${tool.tool}`}
                tool={tool.tool}
                imageLink={tool.imageLink}
                altText={tool.altText}
            />
        );
        return (
            <ButtonCollectionWrapper>
                {tools}
            </ButtonCollectionWrapper>
        );
    }

    return (
        <div>
            {Render()}
        </div>
    );
}
