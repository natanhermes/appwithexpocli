import { TextProps as TextPropsNative} from "react-native";

type FontSize = '16' | '24' | '48';
type FontWeight = 'medium' | 'bold';

export interface TextProps extends TextPropsNative {
    fontWeight: FontWeight;
    fontSize?: FontSize | string;
    text?: string;
}