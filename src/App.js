import React, { useState } from "react";
import "./App.css";
import { Button, Col, Container, Media, Navbar, Row } from "react-bootstrap";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { items } from "./items";
import CartModal from "./CartModal";
import { useEffect } from "react";

function App() {
  const [allItems, setAllItems] = useState(items);
  const [cartItems, setCartItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    setFilteredItems(allItems);
  }, [allItems]);

  useEffect(() => {
    showFavorite
      ? setFilteredItems(allItems.filter((item) => item.isFavorited))
      : setFilteredItems(allItems);
  }, [showFavorite]);

  const toggleFavorite = (favorite) => {
    const updatedItems = allItems.map((item) => {
      if (item.id === favorite.id) {
        return {
          ...item,
          isFavorited: !item.isFavorited,
        };
      }
      return item;
    });
    setAllItems(updatedItems);
  };

  const addToCart = (item) => {
    const isInTheCart = (item) => {
      return cartItems.includes(item);
    };
    if (!isInTheCart(item)) {
      setCartItems([...cartItems, item]);
    }
  };

  const buttonText = showFavorite ? "Show All" : "Show Favorite";

  const handleChange = () => {
    setShowFavorite((prev) => !prev);
  };

  return (
    <>
      <Navbar className="nav fixed-top" variant="dark">
        <Navbar.Brand className="logo">MacShop</Navbar.Brand>
        {cartItems.length === 0 ? (
          <RiShoppingCartLine
            className="cartIcon"
            onClick={() => setIsModalOpen(true)}
          />
        ) : (
          <RiShoppingCartFill
            className="cartIcon"
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </Navbar>
      <Container className="shop">
        <Button onClick={handleChange}>{buttonText}</Button>
        <Row>
          {filteredItems.map((item) => {
            return (
              <Col xs={12} md={6} key={item.id} className="p-3 ">
                <Row className=" bg-white shadow-sm h-100  justify-content-around">
                  <Col
                    xs={8}
                    className="p-3 d-flex flex-column justify-content-around"
                  >
                    <div className="d-flex align-items-center mb-3">
                      <h3 className="d-inline mb-0">{item.name}</h3>
                      <div>
                        {item.isFavorited ? (
                          <AiFillHeart
                            className="favorite-icon"
                            onClick={() => toggleFavorite(item)}
                          />
                        ) : (
                          <AiOutlineHeart
                            className="favorite-icon"
                            onClick={() => toggleFavorite(item)}
                          />
                        )}
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <h5>
                      {" "}
                      Price: <strong>{item.price}</strong>$
                    </h5>
                  </Col>
                  <Col xs={3} className="p-3 d-flex flex-column align-items-center justify-content-around">
                    <Media>
                      <img
                        width={90}
                        height={85}
                        src={`images/${item.photoURL}`}
                        alt={item.name}
                      />
                    </Media>
                    <Button
                      className="w-100 d-flex align-items-center justify-content-around"
                      onClick={() => addToCart(item)}
                    >
                      {" "}
                      <BsPlusSquare className="fs-3 btn-add-icon" />
                      ADD
                    </Button>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
      <CartModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
}

export default App;
