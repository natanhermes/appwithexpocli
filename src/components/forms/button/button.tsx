import { Loading } from "../../loading";
import { ButtonProps } from "./button.props";

import { Container, Title } from './button.styles';

export function Button({ title, backgroundColor, borderColor, isLoading, ...rest }: ButtonProps) {
    return (
        <Container borderColor={borderColor} backgroundColor={backgroundColor} {...rest}>
            {isLoading ? (
                <Loading />
            ) : (
                <Title>
                    {title}
                </Title>
            )}
        </Container>
    );
}