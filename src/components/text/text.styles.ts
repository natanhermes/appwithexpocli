import styled from "styled-components/native";
import { TextProps } from "./text.props";

export const TextStyled = styled.Text<TextProps>`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme, fontWeight}) => {
        if(fontWeight) return theme.fonts[fontWeight]
        else theme.fonts['medium']
    }};
    font-style: normal;
    font-size: ${({ fontSize = 16}) => fontSize}px;
`;