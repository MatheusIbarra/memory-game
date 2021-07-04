//import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from 'react-native'

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
    applyShadow: boolean;
}

export const Container = styled.View<ContainerProps>`
    height: 60px;
    padding: 0 16px;
    border-radius: 10px;
    background-color: #fff;
    margin: 5px 10px;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    flex-direction: row;
    align-items: center;
    ${(props) =>
        props.applyShadow &&
        css`
            box-shadow:5px 5px 5px #7d7d7d;
        `}
    ${(props) =>
        props.isErrored &&
        css`
            border: 0.5px solid rgba(210, 1, 23, 0.2);
        `}
    ${(props) =>
        props.isFocused &&
        css`
            border: 0.5px solid rgba(0, 0, 0, 0.5);
        `}
`;

export const Input = styled(TextInput)`
    flex: 1;
    z-index: 2;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: black;
    font-size: 18px;
`;

export const Icon = styled(Feather)`
    margin-right: 16px;
`;
