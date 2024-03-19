import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    transform-origin: center;
`;

type ZoomAreaProps = {
    zoomFactor: number;
    children: React.ReactNode;
};

export function ZoomArea({ zoomFactor, children }: ZoomAreaProps) {
    return (
        <Container style={{ transform: `scale(${zoomFactor})` }}>
            {children}
        </Container>
    );
}
