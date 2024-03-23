import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

const MainNav = () => {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsExpanded(false); // Close navbar when form is submitted
        
        const searchField = e.target.elements.searchField.value;
        router.push(`/artwork?title=true&q=${searchField}`);

        setSearchHistory(current => [...current, `title=true&q=${searchField}`]);
    };

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded); // Toggle isExpanded value
    };

    const closeNavbar = () => {
        setIsExpanded(false); // Close navbar when any Nav.Link is clicked
    };

    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Khushi Kotadia</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" onClick={closeNavbar}>
                            <Nav.Link href="/" passHref legacyBehavior>Home</Nav.Link>
                            <Nav.Link href="/search" passHref legacyBehavior>Advanced Search</Nav.Link>
                        </Nav>
                        &nbsp;
                        <Form onSubmit={handleSubmit} className="d-flex">
                            <Form.Control name="searchField" type="text" placeholder="Search" className="sm-2" />
                            &nbsp; 
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                        &nbsp;
                        <Nav>
                        <NavDropdown title="kkotadia" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/favourites" passHref onClick={closeNavbar}>Favourites</NavDropdown.Item>
                            <NavDropdown.Item href="/history" passHref onClick={closeNavbar}>Search History</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/> <br/>
        </>
    );
};

export default MainNav;
