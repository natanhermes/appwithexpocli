import { TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    backgroundColor?: string;
    borderColor?: string;
    isLoading?: boolean;
}

export interface ButtonStyleProps {
    backgroundColor?: string;
    borderColor?: string;
}