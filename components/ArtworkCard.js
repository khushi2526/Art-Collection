import { Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import useSWR from "swr";

const ArtworkCard = ({ objectID }) => {
  const router = useRouter();

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          primaryImageSmall ||
          "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
      />
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {classification || "N/A"}
          <br />
          <strong>Medium:</strong> {medium || "N/A"}
        </Card.Text>
        <Button
          variant="outline-dark"
          onClick={() => router.push(`/artwork/${objectID}`)}
          passHref
        >
          <strong>ID:</strong> {objectID}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
