import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { searchHistoryAtom, favouritesAtom } from "@/store";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userData";

export default function Login() {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function updateAtoms() {
    try {
      const favourites = await getFavourites(); // Fetch favourites from the backend
      const history = await getHistory(); // Fetch history from the backend
      
      favouritesAtom(favourites);
      searchHistoryAtom(history);

    } catch (error) {
      console.error("Error updating atoms:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try{
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");
    }catch(err){
     setWarning(err.message);
    }

  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group  >

        {warning && <>
          <br />
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}