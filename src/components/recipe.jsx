import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Recipe() {
    const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    fetch("https://dummyjson.com/recipes")
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.json();
      })
      .then((result) => setRecipes(result.recipes))
      .catch((err) => console.error(err));

    fetch("https://dummyjson.com/recipes/tags")
      .then((response) => response.json())
      .then((result) => setTags(result))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [search, recipes]);

  const handleSelectedTag = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  const filteredByTags =
    selectedTags.length > 0
      ? filteredRecipes.filter((recipe) =>
          selectedTags.some((tag) => recipe.tags.includes(tag))
        )
      : filteredRecipes;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const addToCart = (recipe) => {
    const recipeExists = cart.find((item) => item.id === recipe.id);
    if (recipeExists) {
      alert("This recipe is already in the cart!");
      return;
    }
    setCart((prevCart) => [...prevCart, recipe]);
  };

  const removeFromCart = (recipeId) => {
    const updatedCart = cart.filter((item) => item.id !== recipeId);
    setCart(updatedCart);
  };

  const handleSave = async () => {
    try {
      const savePromises = cart.map(async (item) => {
        const newItem = { ...item, id: Number(item.id) };
        try {
          const res = await axios.post("http://localhost:9999/carts", newItem);
          if (res.status === 201) {
            return newItem;
          } else {
            throw new Error("Failed to save recipe");
          }
        } catch (err) {
          console.error("Error saving recipe:", err);
          return null;
        }
      });

      await Promise.all(savePromises);
      setCart([]);
      alert("Recipes saved successfully!");
    } catch (error) {
      console.log("Error during the save process:", error);
      alert("An error occurred while saving recipes.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={7}>
          <h1>Recipe</h1>
        </Col>
        <Col md={2}>
            <h5>Welcome</h5>
            
            <Button variant="info" onClick={handleLogout}>
              Logout
            </Button>
          
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <div className="mb-2">
            <p>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
              />
            </p>
          </div>
          <Row>
            {filteredByTags.length > 0 ? (
              filteredByTags.map((r) => (
                <Col key={r.id} md={3} className="mb-4">
                  <div className="card" style={{ width: "100%" }}>
                    <Link to={"/recipes/" + r.id}>
                      <img
                        src={r.image}
                        className="card-img-top"
                        alt={r.name}
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                    <div className="card-body">
                      <div style={{ textAlign: "center" }}>
                        <Link to={"/recipes/" + r.id}>{r.name}</Link>{" "}
                        <p className="card-text">Rating: {r.rating}</p>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button variant="primary" onClick={() => addToCart(r)}>
                          Add Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p>Empty</p>
            )}
          </Row>
        </Col>
        <Col md={4}>
          <h4>Tags</h4>
          {tags.length > 0 ? (
            <Row>
              <Col md={6}>
                {tags.slice(0, Math.ceil(tags.length / 2)).map((t, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedTags.includes(t) ? "primary" : "outline-primary"
                    }
                    onClick={() => handleSelectedTag(t)}
                  >
                    {t}
                  </Button>
                ))}
              </Col>
              <Col md={6}>
                {tags.slice(Math.ceil(tags.length / 2)).map((t, index) => (
                  <Button
                    key={index + tags.length / 2}
                    variant={
                      selectedTags.includes(t) ? "primary" : "outline-primary"
                    }
                    onClick={() => handleSelectedTag(t)}
                  >
                    {t}
                  </Button>
                ))}
              </Col>
            </Row>
          ) : (
            <p>Empty</p>
          )}

          <hr />
          <h4>Cart</h4>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.rating}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Empty</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Button className="btn btn-success mt-3" onClick={handleSave}>
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Recipe;
