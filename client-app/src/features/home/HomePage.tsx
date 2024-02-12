import {observer} from "mobx-react-lite";
import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useStore} from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";


export default observer(function HomePage() {

    const {userStore, modalStore} = useStore();

    return (
        <Segment inverted textAlign={'center'} vertical className={'masthead'}>
            <Container text>
                <Header as={'h1'} inverted>
                    <Image size={'massive'} src={'/assets/harvest.png'} alt={'logo'} style={{marginBottom: 12}} />
                    MyFarm
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as={'h2'} inverted content={'Welcome to MyFarm!'} />
                        <Button as={Link} to={'farms'} size={'huge'} inverted>
                            Go to Farms!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size={'huge'} inverted>
                            Sign In!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size={'huge'} inverted>
                            Sign Up
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})