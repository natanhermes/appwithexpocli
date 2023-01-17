import { Alert, Image, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from 'react-hook-form'

import { LayoutLoginProps } from "./layout-login.props";
import { GroupButtons, Container, ContainerPassword, FormLoginContainer } from "./layout-login.styles";
import { Text } from '../../components/text';
import { Input, Button } from "../forms";

import { useTheme } from "styled-components";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { AppError } from "../../utils/AppError";
import { useState } from "react";

type FormData = {
    email: string,
    password: string,
}

const loginSchema = yup.object({
    email: yup.string().required('Informe seu e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe sua senha.'),
});

export function LayoutLogin({ navigateNewAccount }: LayoutLoginProps) {
    const theme = useTheme();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema)  
    });

    async function handleLogin({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await login(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const errorMessage = isAppError ? error.message : 'Erro no login. Tente novamente mais tarde!';

            setIsLoading(false);
            Alert.alert('Error', errorMessage);
        }
    }

    return (
        <Container>
            <Image source={require('../../assets/logo.png')} />

            <FormLoginContainer>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Email"
                            placeholder="exemplo@email.com"
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.email?.message}
                        />
                    )}
                />
                <ContainerPassword>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Senha"
                                placeholder="*********"
                                secureTextEntry
                                returnKeyType="send"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                </ContainerPassword>

                <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', marginTop: 32 }}>
                    <Text fontWeight={'bold'} text="Esqueceu sua senha?" />
                </TouchableOpacity>
            </FormLoginContainer>
            <GroupButtons>
                <Button disabled={isLoading} title="Enviar" isLoading={isLoading} onPress={handleSubmit(handleLogin)} />
                <Text text="ou" fontWeight={'bold'} style={{ marginVertical: 16, alignSelf: 'center' }} />
                <Button
                    title="Cadastre-se"
                    backgroundColor={theme.colors.transparent}
                    borderColor={theme.colors.white}
                    onPress={navigateNewAccount}
                />
            </GroupButtons>
        </Container>
    )
}