import React, { useState, useCallback, useEffect, useRef } from "react";
import { TextInputProps, StyleProp, ViewStyle } from "react-native";

import { Container, Input, Icon } from "./styles";

import { Picker } from '@react-native-community/picker';
import { useTheme } from "styled-components/native";

interface InputProps extends TextInputProps {
    name: string;
    autoComplete?: boolean;
    icon?: string;
    iconSide?: 'left' | 'right';
    onIconClick?: (name: string, value: string) => void;
    defaultValue?: string;
    value?: string;
    containerStyle?: StyleProp<ViewStyle>;
    type?: string;
    required?: boolean;
    minLength?: number;
    placeholder?: string;
    equalTo?: string;
    noSpaces?: boolean;
    onlyNumbers?: boolean;
    currency?: boolean;
    textColor?: string;
    textFont?: string;
    date?: 'month/year' | 'date/month/year';
    applyShadow?: boolean;
    inputMask?: string | string[];
    onTextChange?: (name: string, value: string) => void;
    handleErrors?: (name: string, error: string) => void;
    //onChange?: (name: string, value: string) => void;
}

interface InputValueReference {
    value: string;
}

const InputContainer: React.FC<InputProps> = ({ name, defaultValue, value, icon, applyShadow = true, iconSide = 'left', onIconClick, onTextChange, handleErrors, equalTo, noSpaces, onlyNumbers, inputMask, containerStyle, ...rest }) => {
    const inputElementRef = useRef<any>(null);
    const inputValueRef = useRef<InputValueReference>({ value: value ? value : defaultValue ? defaultValue : '' });
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [error, setError] = useState<string>("");
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const theme = useTheme();

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
        } else {
            const { type, required, minLength, placeholder } = rest;
            const value = inputValueRef.current.value;
            if (typeof value === "string") {
                if (required && value.length === 0) {
                    setError(
                        `${placeholder ? placeholder : name}: obrigatório`
                    );
                } else if (minLength && value.length < minLength) {
                    setError(
                        `${
                            placeholder ? placeholder : name
                        }: tamanho mínimo de ${minLength} caracteres`
                    );
                } else if (
                    type === "email" &&
                    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        String(value).toLowerCase()
                    )
                ) {
                    setError(`email: digite um endereço válido`);
                } else if (equalTo && equalTo !== value) {
                    setError(`${placeholder ? placeholder : name}: incompatível`)
                } else if (noSpaces && /\s/.test(value)) {
                    setError(`${placeholder ? placeholder : name}: espaço não permitido`);
                } else if (onlyNumbers && /[^0-9]/g.test(value)) {
                    setError(`${placeholder ? placeholder : name}: somente números`);
                } else if (rest.date) {
                    if (rest.date === 'date/month/year') {
                        if (Number(value.replace('/', '').substr(0,2)) < 1 || Number(value.replace('/', '').substr(0,2)) > 31) {
                            setError(`${placeholder ? placeholder : name}: dia inválido`);
                        } else if (Number(value.replace('/', '').substr(2,4)) < 1 || Number(value.replace('/', '').substr(2,4)) > 12) {
                            setError(`${placeholder ? placeholder : name}: mês inválido`);
                        } else {
                            setError("");
                        }
                    } else if (rest.date === 'month/year') {
                        if (Number(value.replace('/', '').substr(0,2)) < 1 || Number(value.replace('/', '').substr(0,2)) > 12) {
                            setError(`${placeholder ? placeholder : name}: mês inválido`);
                        } else {
                            setError("");
                        }
                    }
                } else {
                    setError("");
                }
            } else {
                setError("");
            }
        }
    }, [inputValueRef.current.value]);

    useEffect(() => {
        if (handleErrors) handleErrors(name, error);
    }, [error]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    // useEffect(() => {
    //     inputValueRef.current.value = value ? value : defaultValue ? defaultValue : '';
    // }, [defaultValue, value]);

    const handleIconClick = () => {
        onIconClick && onIconClick(name, value ? value : defaultValue ? defaultValue : '')
    }

    const handleTextChange = (text: string) => {
        inputValueRef.current.value = text;
        onTextChange && onTextChange(name, text);
    };

    return (
        <Container
            isErrored={!!error}
            isFocused={isFocused}
            applyShadow={applyShadow}
        >
            {icon && iconSide === 'left' && (
                <Icon
                    name={icon}
                    size={20}
                    color={
                        !!error
                            ? theme.error
                            : isFocused || isFilled
                            ? theme.textDark
                            : "#666360"
                    }
                    onPress={onIconClick ? handleIconClick : undefined}
                />
            )}

            <Input
                ref={inputElementRef}
                keyboardAppearance="dark"
                value={inputValueRef.current.value}
                //defaultValue={value ? undefined : inputValueRef.current.value}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={handleTextChange}
                {...rest}
            />

            {icon && iconSide === 'right' && (
                <Icon
                    name={icon}
                    size={20}
                    color={
                        !!error
                            ? theme.error
                            : isFocused || isFilled
                            ? theme.textDark
                            : "#666360"
                    }
                    onPress={onIconClick ? handleIconClick : undefined}
                />
            )}
        </Container>
    );
};

export default InputContainer;
