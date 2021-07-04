import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
    height: 60px;
    width: 100%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const ButtonContainer = styled(LinearGradient)`
    flex: 1;
    flex-direction: row;
    width: 100%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    /* font-family: ${(props) => props.theme.fontButton}; */
`;

export const LoadingSpinner = styled(ActivityIndicator)`
    justify-self: center;
    align-self: center;
`;
