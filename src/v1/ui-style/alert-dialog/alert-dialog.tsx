import styled from 'styled-components';

export const StyledAlertDialog = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 20%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 40%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    z-index: 1;
    text-align: center;

    @media (min-width: 600px) {
        .Modal {
            width: 500px;
            left: calc(50% - 250px);
        }
    }
`;

export const ResizeContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
`;

export const Title = styled.span`
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
`;

export const SizeInputWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    gap: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export const SizeInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;
