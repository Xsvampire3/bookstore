import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://6411eb2ef9fe8122ae17c105.mockapi.io/books")
      .then((res) => {
        setBooks(res.data);
      });
  }, []);

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
  };

  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + Number(curr.price),
    0
  );

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>My Book Store</h1>
      <input
        type="text"
        placeholder="Search books"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex-item">
        <div>
          <h2>Books</h2>
          {filteredBooks.map((book) => (
            <div className="container" key={book.id}>
              <div>
                <p>Book Name:</p>
                <p>
                  <b>{book.bookName}</b>
                </p>
                <p>Price:</p>
                <p>
                  <b>Rs. {book.price}</b>
                </p>
                <button
                  onClick={() => addToCart(book)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart">
          {cartItems.length > 0 && (
            <div>
              <h2>Cart</h2>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>{item.bookName}</p>
                  <p>Rs. {item.price}</p>
                </div>
              ))}
              <p>
                <b>Total: Rs. {totalPrice}</b>
              </p>
              <button type="button">Proceed to payment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
