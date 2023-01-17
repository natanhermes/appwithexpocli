import { View } from "react-native";
import { useTheme } from "styled-components/native"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/loading";

export function Routes() {
    const themeApp = useTheme();
    const { user, isLoadingUserStorage } = useAuth();

    const themeNavigation = DefaultTheme;
    themeNavigation.colors.background = themeApp.colors.primary;

    if (isLoadingUserStorage) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: themeApp.colors.primary }}>
            <NavigationContainer theme={themeNavigation}>
                {user.uuid ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </View>
    )
}