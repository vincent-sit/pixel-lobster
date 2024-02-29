import React, { useId } from 'react';
import { Background } from '../ui-style/canvas/ui';
import { LayerProps } from './canvas';

export function BackgroundLayer({width, height} : LayerProps) {
    const patternId = useId();

    return (
        <Background>
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

