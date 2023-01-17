import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { ButtonStyleProps } from "./button.props";

export const Container = styled(TouchableOpacity)<ButtonStyleProps>`
    width: 100%;
    padding: 16px;
    align-items: center;

    background-color: ${({theme, backgroundColor}) => backgroundColor ?? theme.colors.secondary};
    
    border-radius: 24px;

    ${({ borderColor }) => {
        if(borderColor) {
            return css`
                border: 1px solid ${borderColor};
            `
        } else {
            return css`
                border: none;
            `
        }
    }}
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.white};
    font-size: 16px;
`;