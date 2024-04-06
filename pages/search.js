/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store.js';
import { addToHistory } from '@/lib/userData';

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [geoLocation, setGeoLocation] = useState('');
  const [medium, setMedium] = useState('');
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const onSubmit = async (data) => {
    let queryString = "";

    if (searchQuery) {
      queryString += `&searchQuery=${searchQuery}`;
    }
    if (searchBy) {
      queryString += `&searchBy=${searchBy}`;
    }
    if (geoLocation) {
      queryString += `&geoLocation=${geoLocation}`;
    }
    if (medium) {
      queryString += `&medium=${medium}`;
    }

    queryString += `&highlighted=${data.highlighted || false}`;
    queryString += `&currentlyOnView=${data.currentlyOnView || false}`;
    queryString += `&q=${data.searchQuery}`;

    router.push(`/artwork?${queryString}`);

    await addToHistory(queryString); 
    setSearchHistory(current => [...current, queryString]);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Search Query</Form.Label>
              <Form.Control type="text" {...register("searchQuery")} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Search By</Form.Label>
              <select className="mb-3 form-select" {...register("searchBy")}>
                <option value="title">Title</option>
                <option value="tags">Tags</option>
                <option value="artistOrCulture">Artist or Culture</option>
              </select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" {...register("geoLocation")} />
              <small className="text-muted form-text">
                "Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc. ), with multiple values separated
                by the | operator"
              </small>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" {...register("medium")} />
              <small className="text-muted form-text">
                "Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple
                values separated by the | operator"
              </small>
            </Form.Group>
          </Col>
        </Row>

          <Col>
            <Form.Group>
              <Form.Check type="checkbox" label="Highlighted" {...register("highlighted")} />
              <Form.Check type="checkbox" label="Currently On View" {...register("currentlyOnView")} />

            </Form.Group>
          </Col>

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}