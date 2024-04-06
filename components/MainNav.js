import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react'; 
import { useAtom } from 'jotai'; 
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 
  const token = readToken();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const searchField = e.target.search.value;
    if(searchField.trim() !== '') { 
      const queryString = `title=true&q=${encodeURIComponent(searchField)}`;
      await addToHistory(queryString);
      setSearchHistory(current => [...current, queryString]); 
      router.push(`/artwork?${queryString}`);
    }
    setIsExpanded(false); 
  };

  const collapseNavbar = () => setIsExpanded(false);

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-primary" onToggle={() => setIsExpanded(!isExpanded)}>
        <Container>
          <Navbar.Brand>Khushi Kotadia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link onClick={collapseNavbar}>Home</Nav.Link></Link>
              {token && <Link href="/search" passHref legacyBehavior><Nav.Link onClick={collapseNavbar}>Advanced Search</Nav.Link></Link>}
            </Nav>
            &nbsp;

            <Nav>
              {token ? (
                <>
                  <Form inline onSubmit={handleSearchSubmit} className="d-flex">
                    <FormControl type="text" placeholder="Search" className="me-2" name="search" />
                    <Button type="submit" variant="outline-success">Search</Button>
                  </Form>
                  &nbsp;
                  <NavDropdown title={token.userName} id="nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={collapseNavbar}>Favourites</NavDropdown.Item></Link>
                    <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={collapseNavbar}>Search History</NavDropdown.Item></Link>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown></>
              ) : (
                <Nav>
                  <Link href="/register" passHref legacyBehavior><Nav.Link onClick={collapseNavbar} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                  <Link href="/login" passHref legacyBehavior><Nav.Link onClick={collapseNavbar} active={router.pathname === "/login"}>Login</Nav.Link></Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
