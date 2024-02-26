import React, { useState } from 'react';
import { ToolButton } from './tool-button';
import { ToolSetData } from './tool-set-data';
import styled from 'styled-components';

const ButtonCollectionWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    
`;

export function ToolButtonCollection() {
    const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(null);

    function Render() {
        const tools = ToolSetData.map((tool) =>
            <ToolButton 
                key={`tool-${tool.tool}`}
                tool={tool.tool}
                imageLink={tool.imageLink}
                altText={tool.altText}
                pressed={tool.isPressed}
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
