import { useNavigation } from "@react-navigation/native";
import { LayoutLogin } from "../../components/layout-login";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

export function Login() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    return <LayoutLogin navigateNewAccount={handleNewAccount} />
}