import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; 
import { Row, Col, Container } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard'; 

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null; 
  
  return (
    <Container className="mt-5">
      <h1>Favourites</h1>
      {favouritesList.length > 0 ? (
        <Row xs={1} md={2} lg={4} className="g-4">
          {favouritesList.map((objectID) => (
            <Col key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nothing Here. Try adding some new artwork to the list.</p>
      )}
    </Container>
  );
}
