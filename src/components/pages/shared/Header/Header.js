import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';

const Header = () => {
    const {user,logOut,isloading}=useAuth();
    const [userRole, setUserRole] = useState(null);
    useEffect(()=>{
        async function getUser(email) {
            await axios.post('http://localhost:5000/get-user-role', {"email":email}).then(res => {
                console.log(res.data.role)
                setUserRole(res.data.role)
            })
        }
        console.log(user.email)
        getUser(user.email)
    },[user.email])
    if (userRole==null) {
        return (
            <div className="d-flex my-5 justify-content-center">
                <Spinner animation="grow" variant="danger" />
            </div>
        );
    };
    const handleLogout = () => {
        logOut();
    }
    
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="https://e-lor.brain-cache.com/"><img src="https://e-lor.brain-cache.com/wp-content/uploads/2021/12/logo-e1638736055426.png" alt="" srcset="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="https://e-lor.brain-cache.com/">Home</Nav.Link>
                            {/* <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                            {user.email && userRole=="customer" ?
                                <>
                                    <Link to="/customer/dashboard/" className="main-button me-2">Dashboard</Link>
                                    <Link to="/profile" className="main-button me-2">{user.displayName}</Link>
                                    <Button onClick={handleLogout} className="main-button">logout</Button>
                                </>
                                :<></>
                            }
                            {user.email && userRole=="vendor" ?
                                <>
                                    <Link to="/vendor/dashboard/" className="main-button me-2">Dashboard</Link>
                                    <Link to="/profile" className="main-button me-2">{user.displayName}</Link>
                                    <Button onClick={handleLogout} className="main-button">logout</Button>
                                </>
                                :<></>
                            }
                            {user.email && userRole=="admin" ?
                                <>
                                    <Link to="/admin/dashboard/" className="main-button me-2">Dashboard</Link>
                                    <Link to="/profile" className="main-button me-2">{user.displayName}</Link>
                                    <Button onClick={handleLogout} className="main-button">logout</Button>
                                </>
                                :<></>
                            }
                            {
                                userRole=="guest"?<>
                                <Link to="/login" className="main-button">Login</Link>
                                <Link to="/vendor/registration" className="main-button">v-reg</Link>
                                </>:<></>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;