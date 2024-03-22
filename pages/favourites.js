import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; // Importing favouritesAtom from store
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard'; // Assuming the correct path to ArtworkCard

const Favourites = () => {
  // Accessing favouritesAtom to get the favouritesList
  const [favourites] = useAtom(favouritesAtom);
  
  return (
    <Container>
      <h1>Favourites</h1>
      {favourites.length === 0 ? (
        <Alert variant="info">
          Nothing Here. Try adding some new artwork to the list.
        </Alert>
      ) : (
        <Row>
          {favourites.map((objectID, index) => (
            <Col key={objectID} sm={12} md={6} lg={4}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favourites;
