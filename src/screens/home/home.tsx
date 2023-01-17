import { Button } from "../../components/forms";
import { useAuth } from "../../hooks/useAuth";
import { Container, Title, ContainerButton } from "./home.styles";

export function Home() {
    const { logout, user } = useAuth();

    return (
        <Container>
            <Title text={`Bem vindo, ${user.name}`} fontWeight="bold" />
            <ContainerButton>
                <Button title="Sair" onPress={logout} />
            </ContainerButton>
        </Container>
    )
}