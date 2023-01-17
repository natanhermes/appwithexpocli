import { TextProps } from "./text.props"
import { TextStyled } from "./text.styles"

export function Text({ fontSize, fontWeight, text, style}: TextProps) {
    return <TextStyled style={style} fontSize={fontSize} fontWeight={fontWeight}>{text}</TextStyled>
}