import React from "react";
import { TouchableOpacityProps, StyleProp } from "react-native";

import { Feather, FontAwesome, FontAwesome5,AntDesign } from "@expo/vector-icons";

import { Container, ButtonContainer, ButtonText, LoadingSpinner } from "./styles";
import { useTheme } from "styled-components/native";

interface ButtonProps extends TouchableOpacityProps {
    background: string | string[];
    color?: string;
    text?: string;
    textSize?: number;
    iconLib?: "Feather" | "FontAwesome" | "FontAwesome5" | "AntDesign";
    icon?: string;
    iconSize?: number;
    iconColor?: string;
    loading?: boolean;
    borderRadius?: number;
}

const Button: React.FC<ButtonProps> = ({
    icon,
    iconSize,
    iconColor,
    color,
    text,
    textSize,
    background,
    iconLib = "Feather",
    loading = false,
    borderRadius,
    ...rest
}) => {
    const theme = useTheme();

    return (
        <Container {...rest}>
            <ButtonContainer style={{ ...(borderRadius ? { borderRadius } : {}) }}
                colors={
                    Array.isArray(background)
                        ? background
                        : [background, background]
                }
            >
                {!loading && icon &&
                    (iconLib === "FontAwesome5" ? (
                        <FontAwesome5
                            name={icon}
                            size={iconSize ? iconSize : 20}
                            color={iconColor ? iconColor : theme.text}
                            style={{ marginRight: !!text ? 12 : 0 }}
                        />
                    ) : iconLib === "FontAwesome" ? (
                        <FontAwesome
                            name={icon as any}
                            size={iconSize ? iconSize : 20}
                            color={iconColor ? iconColor : theme.text}
                            style={{ marginRight: !!text ? 12 : 0 }}
                        />
                    ) : (iconLib === "AntDesign" ? (
                        <AntDesign
                            name={icon as any}
                            size={iconSize ? iconSize : 20}
                            color={iconColor ? iconColor : theme.text}
                            style={{ marginRight: !!text ? 12 : 0 }}
                        />
                        ) : <Feather
                            name={icon as any}
                            size={iconSize ? iconSize : 20}
                            color={iconColor ? iconColor : theme.text}
                            style={{ marginRight: !!text ? 12 : 0 }}
                          />
                    ))}
                {!loading && text && (
                    <ButtonText
                        style={{
                            fontSize: textSize ? textSize : 16,
                            color: color ? color : theme.text,
                        }}
                    >
                        {text}
                    </ButtonText>
                )}
                {loading && (
                    <LoadingSpinner
                        animating={loading}
                        size="large"
                        color={theme.text}
                    />
                )}
            </ButtonContainer>
        </Container>
    )
};

export default Button;
