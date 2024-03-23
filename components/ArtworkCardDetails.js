import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import { useState } from "react";
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'; // Importing favouritesAtom from store
import Error from 'next/error'; 

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  // Accessing favouritesAtom and its setter function
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favourites.includes(objectID));

  useState(() => {
      setShowAdded(favourites.includes(objectID));
  }, [favourites, objectID]);
  

  // Function to handle adding or removing artwork from favourites
  const favouritesClicked = () => {
    if (showAdded) {
      setFavourites(current => current.filter(fav => fav !== objectID));
    } else {
      setFavourites(current => [...current, objectID]);
    }
    setShowAdded(!showAdded);
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    artistDisplayName,
    creditLine,
    dimensions,
    medium,
    artistWikidata_URL,
  } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {classification || "N/A"}
          <br />
          <strong>Medium:</strong> {medium || "N/A"}
          <br />
          {medium && (
            <>
              <br />
              <br />
            </>
          )}
          <strong>Artist:</strong> {artistDisplayName || "N/A"}
          {artistDisplayName && artistWikidata_URL && (
            <>
              {" "}
              (
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
              )
            </>
          )}
          <br />
          <strong>Credit Line:</strong> {creditLine || "N/A"}
          <br />
          <strong>Dimensions:</strong> {dimensions || "N/A"}
        </Card.Text>
        {/* Button to add or remove artwork from favourites */}
        <Button 
          variant={showAdded ? 'primary' : 'outline-primary'} 
          onClick={favouritesClicked}
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
