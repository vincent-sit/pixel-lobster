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
    z-index: 9999;
    text-align: center;

    @media (min-width: 600px) {
        .Modal {
            width: 500px;
            left: calc(50% - 250px);
        }
    }
`;
