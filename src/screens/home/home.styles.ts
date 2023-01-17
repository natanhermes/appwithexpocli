import styled from "styled-components/native";
import { Text, TextProps } from "../../components/text";

export const Container = styled.View`
    flex: 1;

    justify-content: space-between;
    padding: 64px 32px;
`;

export const Title = styled(Text)<TextProps>`
    font-size: 48px;
`;

export const ContainerButton = styled.View`
    background-color: '#F27F3E';
    border-radius: 24px;
    width: 100%;
`;