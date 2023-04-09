import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white", textDecoration: "none"}} to={SHOP_ROUTE}>Купи девайс</NavLink>
                {user.isAuth ?
                    <Nav className="ms-auto" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(BASKET_ROUTE)}
                            className="me-4"
                        >
                            Корзина
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => {
                                logOut()
                            }}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;