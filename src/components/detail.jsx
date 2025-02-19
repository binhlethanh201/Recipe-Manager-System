import { useEffect, useState } from "react";
import { Container, Row, Tabs, Tab, Col, Button, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";

function Detail() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((response) => response.json())
      .then((result) => setRecipeDetail(result))
      .catch((error) => console.error(error));
  }, [id]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    fetch(`https://dummyjson.com/recipes/${id}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: userRating }),
    })
      .then((response) => response.json())
      .then((result) => {
        setRecipeDetail((prevDetail) => ({
          ...prevDetail,
          rating: result.rating,
        }));
        setUserRating(0);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={12}>
          <h1>Recipe Details</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Link to={"/recipes"} className="btn btn-success">
            Back to recipes list
          </Link>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={5}>
          <img
            src={recipeDetail?.image}
            alt={recipeDetail?.name}
            style={{ width: "400px", height: "400px" }}
          />
        </Col>
        <Col md={5}>
          <h1>{recipeDetail?.name}</h1>
          <br />
          <h3 style={{ color: "grey" }}>Rating: {recipeDetail?.rating}</h3>
        </Col>
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="ingredients"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="ingredients" title="Ingredients">
            <ul>
              {recipeDetail?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Tab>
          <Tab eventKey="instructions" title="Instructions">
            <ol>
              {recipeDetail?.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </Tab>
          <Tab eventKey="rating" title="Voting">
            <p>Current Rating: {recipeDetail?.rating}</p>
            <Form onSubmit={handleRatingSubmit}>
              <Form.Group controlId="ratingSelect">
                <Form.Label>Rate this recipe:</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Form.Check
                      key={rating}
                      type="radio"
                      label={rating}
                      name="rating"
                      value={rating}
                      checked={userRating === rating}
                      onChange={(e) => setUserRating(Number(e.target.value))}
                      inline
                    />
                  ))}
                </div>
              </Form.Group>
              <br/>
              <Button
                variant="primary"
                type="submit"
                disabled={userRating === 0}
              >
                Submit 
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default Detail;
