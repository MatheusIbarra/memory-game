import styled from 'styled-components/native';

export const CloseClick = styled.TouchableOpacity `
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10000;
`

export const ModalContent = styled.View`
    background-color: ${props => props.theme.card};
    max-height: 500px;
    
    border-radius: 10px;
`