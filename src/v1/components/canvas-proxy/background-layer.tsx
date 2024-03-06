import React, { useId } from 'react';
import { styled } from 'styled-components';

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;

interface BackgroundLayerProps {
    width : number,
    height : number
}

export function BackgroundLayer({width, height} : BackgroundLayerProps) {
    const patternId = useId();

    return (
        <Background style={{width: width, height: height}}>
            <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id={patternId} x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="1" height="1" fill="rgba(138, 138, 138, 1)" />
                        <rect x="1" y="1" width="1" height="1" fill="rgba(138, 138, 138, 1)" />
                    </pattern>
                </defs>

                <rect fill="rgba(199, 199, 199, 1)" width={width} height={height} />
                <rect fill={`url(#${patternId})`} width={width} height={height} />
            </svg>
        </Background>
    );
}

