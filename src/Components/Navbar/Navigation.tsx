import React from "react";
import {useHistory} from "react-router-dom"
import {Nav, Navbar} from "react-bootstrap"

const Navigation = () => {
    const history = useHistory();

    const goHome = () => {
        history.push('/');
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" >
                <Navbar.Brand> Water Supply Board </Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={goHome} >Home</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigation;