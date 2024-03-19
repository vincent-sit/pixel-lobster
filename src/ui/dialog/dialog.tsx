import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const StyledDialog = styled.dialog`
    position: fixed;
    background-color: white;
    width: 20%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    z-index: 1;
    text-align: center;

    &::backdrop {
        background-color: black;
        opacity: 0.7;
    }

    @media (min-width: 600px) {
        .Modal {
            width: 500px;
            left: calc(50% - 250px);
        }
    }
`;


interface ResizeDialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}

export function Dialog({
    isOpen,
    onRequestClose,
    children,
}: ResizeDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current) return;

        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return (
        <StyledDialog ref={dialogRef} onCancel={onRequestClose}>
            {children}
        </StyledDialog>
    );
}
