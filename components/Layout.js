import React from 'react';
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';

const Layout = (props) => {
    return (
        <>
            <Container>
                <MainNav />
                <br />
                {props.children}
            </Container>
        </>
    );
};

export default Layout;
