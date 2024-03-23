import { useAtom } from 'jotai';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard.js';
import { favouritesAtom } from '@/store.js';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <div>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Favourites;
