import React from "react";
import {useHistory} from "react-router-dom"
import {Nav, Navbar} from "react-bootstrap"

const Navigation = (props: any) => {
    const history = useHistory();

    const goHome = () => {
        history.push('/');
    }
    const userHome = () => {
        history.push(props.userLink)
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" >
                <Navbar.Brand> Water Supply Board </Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={goHome} >Login/Register</Nav.Link>
                    {
                        props.userLink ? (
                            <Nav.Link onClick={userHome}> Homepage </Nav.Link>
                        ) : null
                    }
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigation;