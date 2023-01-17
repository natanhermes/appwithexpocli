import styled from "styled-components/native";
import { Text } from "../../text";

export const Input = styled.TextInput`
    align-items: center;
    justify-content: center;
    padding-left: 24px;

    height: 56px;

    border-radius: 24px;

    background-color: ${({theme}) => theme.colors.white};
    color: ${({theme}) => theme.colors.primary};

    font-family: ${({theme}) => theme.fonts.medium};
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
`

export const InputLabel = styled(Text)`
    line-height: 24px;

    margin: 0 0 8px 8px;

    color: ${({theme}) => theme.colors.title};
`;

export const ErrorMessage = styled(Text)`
    color: red;
    opacity: 0.5;
    margin: 4px 0 0 8px;
`;
