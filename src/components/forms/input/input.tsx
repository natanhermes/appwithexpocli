import { InputProps } from './input.props';
import { Input as InputStyled, InputLabel, ErrorMessage } from './input.styles';

import { useTheme } from "styled-components"

export function Input({ label, placeholder, errorMessage, ...rest }: InputProps) {
    const theme = useTheme();
    return (
        <>
            {label && (<InputLabel fontWeight='medium' text={label} />)}
            <InputStyled
                {...rest}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.grey}
            />
            {errorMessage && (
                <ErrorMessage 
                    text={errorMessage}
                    fontWeight="medium"
                    fontSize="12"
                />
            )}
        </>
    )
}