import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { LayoutSignUp } from "../../components/layout-sign-up";
import { Text } from "../../components/text";
import { Container } from "./sign-up.styles";

export function SignUp() {
    return (
        <Container 
            style={{ flex: 1 }} 
            contentContainerStyle={{ marginTop: 48, flexGrow: 1, alignItems: 'center' }}
        >
            <LayoutSignUp />
        </Container>
    )
}