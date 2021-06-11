import React, { useState } from "react";
import { Modal, Button, Media, Spinner, Alert } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

function CartModal({ isModalOpen, setIsModalOpen, cartItems, setCartItems }) {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const displayCartItems = (items) => {
    if (items.length === 0 && !error && !success) {
      return "Your Cart is empty";
    } else {
      return items.map((item, i) => (
        <div
          key={item.id}
          className="d-flex align-items-center justify-content-between border-bottom py-3"
        >
          <BsTrash
            className="cartActions"
            onClick={() => removeFromCart(item.id)}
          />
          <Media>
            <img
              width={64}
              height={64}
              src={`images/${item.photoURL}`}
              alt={item.name}
            />
          </Media>
          <strong>{item.name}</strong>
          {`${item.price}$`}
          <h5 className="d-flex align-items-center justify-content-around m-0">
            {" "}
            <BiMinus
              onClick={() => subtructItem(item.id)}
              className="cartActions"
            />
            {item.quantity}{" "}
            <GrFormAdd
              onClick={() => addItem(item.id)}
              className="cartActions"
            />
          </h5>
        </div>
      ));
    }
  };
  const handleClose = () => {
    setError("");
    setIsModalOpen(false);
  };
  const addItem = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const removeFromCart = (id) => {
    const filteredCard = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCard);
  };
  const subtructItem = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id && item.quantity >= 2) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const displayTotal = (items) => {
    let total = 0;
    if (cartItems.length > 0) {
      items.map((item) => (total += item.quantity * item.price));
    }
    return total;
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      setError("The card is empty");
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setCartItems([]);
        setIsLoading(false);
        setSuccess("Order Complited");
      }, 2000);
      setTimeout(() => {
        setSuccess('');
        handleClose()
      }, 5000);
    }
  };
  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {displayCartItems(cartItems)}{" "}
        {cartItems.length > 0 && (
          <div className="cart-total pt-3 d-flex align-items-center justify-content-around">
            {" "}
            <h3>Total:</h3>
            {`${displayTotal(cartItems)}$`}
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="d-flex align-items-center justify-content-between"
          onClick={checkout}
        >
          {isloading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              className="spinner"
            />
          )}
          Checkout
        </Button>
        <Button variant="secondary" onClick = {handleClose}>Continue Shopping</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
