import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Login } from '../screens/login';
import { SignUp } from '../screens/sign-up';

type AuthRoutes = {
    login: undefined;
    signUp: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
                name="login"
                component={Login}
            />

            <Screen
                name="signUp"
                component={SignUp}
            />
        </Navigator>
    );
}