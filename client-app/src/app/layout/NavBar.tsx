import {Container, Dropdown, Menu} from "semantic-ui-react";
import { NavLink} from "react-router-dom";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

export default observer(function NavBar() {
    
    const {userStore: {user, logout}} = useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    MyFarm
                </Menu.Item>
                <Menu.Item as={NavLink} to='/farms' name='Farms'/>
                <Menu.Item position={'right'}>
                    <Dropdown pointing={'top left'} text={user?.username}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text={'Logout'} icon={'profile'} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})