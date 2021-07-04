import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

export const CardContainer = styled.View `
    width: 100px;
    height: 150px;
    border: 0.5px solid black;
    justify-content: space-between;
    background-color: transparent;
`

export const CountTryes = styled.View `
    width: 50px;
    height: 50px;
    border-radius: 1000px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
`

export const BottomItems = styled.View `
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

export const ModalContent = styled.View`
    align-items: center;
    width: 300px;
    height: 500px;
`
export const ModalHeader = styled.View `
    height: 50px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: ${props => props.theme.primary};
`
export const RankingContainer = styled.View `
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 5px;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0,0,0,0.2);
    padding: 10px;
`