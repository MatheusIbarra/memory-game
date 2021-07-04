import styled from 'styled-components/native';

export const Container = styled.View `
    width: 100px;
    height: 150px;
    border: 0.5px solid black;
    padding: 5px;
    justify-content: space-between;
    background-color: ${(props) => props.theme.text};
`

export const BottomCard = styled.Text `
    transform: rotate(180deg);
`