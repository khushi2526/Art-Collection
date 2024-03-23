/********************************************************************************
*  WEB422 – Assignment 5
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Khushi Shaileshkumar Kotadia Student ID: 167632215 Date: 08-03-2024
* 
*  GitHub URL: https://github.com/khushi2526/WEB422_Assignment-5.git
*  Website Link: https://web-422-assignment-4-9d53.vercel.app
*
********************************************************************************/

/* eslint-disable react/no-unescaped-entities */
import { Row, Col, Image } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Row>
        <Col>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded alt="" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>
          The Metropolitan Museum of Art, colloquially "the Met," is located in New York City and is the largest art museum in the United States. It was founded on April 13, 1870, "to be located in the City of New York, for the purpose of establishing and maintaining in said city a Museum and library of art, of encouraging and developing the study of the fine arts, and the application of arts to manufacture and practical life, of advancing the general knowledge of kindred subjects, and, to that end, of furnishing popular instruction."
          </p>
        </Col>
        <Col md={6}>
          <p>
          The Met's permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park in Manhattan's Upper East Side, is by area one of the world's largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>
          <p>
            Here is the link to <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia</a>.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Home;