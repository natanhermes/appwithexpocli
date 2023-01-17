
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from 'react-hook-form'

import { LayoutSignUpProps } from "./layout-sign-up.props";
import { GroupButtons, Container, ContainerPassword, FormLoginContainer } from "./layout-sign-up.styles";
import { Text } from '../../components/text';
import { Input, Button } from "../forms";

import { useTheme } from "styled-components";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { AppError } from "../../utils/AppError";
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

type FormData = {
    name: string,
    email: string,
    password: string,
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe seu nome'),
    email: yup.string().required('Informe seu e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe sua senha.'),
});

export function LayoutSignUp({ }: LayoutSignUpProps) {
    const theme = useTheme();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const { goBack } = useNavigation();


    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(signUpSchema)
    });

    async function handleSignUp({ name, email, password }: FormData) {
        try {
            setIsLoading(true);
            const response = await api.post('/employees', { name, email, password });

            console.log(response.data);


            // await login(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const errorMessage = isAppError ? error.message : 'Erro no login. Tente novamente mais tarde!';

            setIsLoading(false);
            Alert.alert('Error', errorMessage);
        }
    }

    return (
        <>
            <Text text="Crie sua conta" fontWeight='bold' fontSize="24" />

            <FormLoginContainer>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Nome"
                            placeholder="Marcelo Kochiyama"
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginTop: 16 }}>
                            <Input
                                label="Email"
                                placeholder="exemplo@email.com"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        </View>

                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginTop: 16 }}>
                            <Input
                                label="Senha"
                                placeholder="*********"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        </View>

                    )}
                />
            </FormLoginContainer>
            <GroupButtons>
                <Button
                    disabled={isLoading}
                    title="Cadastrar"
                    onPress={handleSubmit(handleSignUp)}
                />
                <View style={{ marginTop: 16 }}>
                    <Button
                        disabled={isLoading}
                        title="Voltar para login"
                        backgroundColor={theme.colors.transparent}
                        borderColor={theme.colors.white}
                        onPress={goBack}
                    />
                </View>
            </GroupButtons>
        </>
    )
}