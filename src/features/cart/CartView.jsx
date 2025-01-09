import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  updateBookInCartAsync,
  deleteBookFromCartAsync,
  clearBooksFromCartAsync,
} from "./cartSlice";
import Header from "../../components/Header";
import {
  fetchWishlist,
  addBookToWishlistAsync,
} from "../wishlist/wishlistSlice";
import { fetchBooks } from "../books/booksSlice";
import { fetchAddresses } from "../address/adressSlice";
import { calculateBooksFinalPrice } from "../books/BookList";
import {
  fetchOrderAsync,
  saveOrderAsync,
  updateOrderAsync,
} from "../orderhistory/orderHistorySlice";

const CartView = () => {
  const [alert, setAlert] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState("");
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
    dispatch(fetchBooks());
    dispatch(fetchAddresses());
    dispatch(fetchOrderAsync());
  }, []);

  const { cart, status, error } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { books } = useSelector((state) => state.books);
  const { addresses } = useSelector((state) => state.address);
  const orderState = useSelector((state) => state.order);

  // Async function to add book to Wishlist from  cart
  const handleAddToWishlist = async (bookToAdd) => {
    if (wishlist.some((item) => item.book._id === bookToAdd._id)) {
      setAlert("Book is already in Wishlist.");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else {
      try {
        const resultAction = await dispatch(
          addBookToWishlistAsync({ book: bookToAdd._id })
        );
        if (addBookToWishlistAsync.fulfilled.match(resultAction)) {
          setAlert("Added to Wishlist");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to update the book quantity in cart
  const handleIncreaseBookQuantity = (book) => {
    try {
      const bookToUpdate = { ...book, quantity: book.quantity + 1 };
      dispatch(
        updateBookInCartAsync({ bookId: bookToUpdate._id, book: bookToUpdate })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Async Function to decrease book quantity or remove book in cart
  const handleDecreaseBookQuantity = async (book) => {
    if (book.quantity > 1) {
      const bookToUpdate = { ...book, quantity: book.quantity - 1 };
      dispatch(
        updateBookInCartAsync({ bookId: bookToUpdate._id, book: bookToUpdate })
      );
    } else {
      try {
        const resultAction = await dispatch(deleteBookFromCartAsync(book._id));
        if (deleteBookFromCartAsync.fulfilled.match(resultAction)) {
          setAlert("Removed book from cart.");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Async function delete book from cart
  const handleRemoveFromCart = async (bookId) => {
    try {
      const resultAction = await dispatch(deleteBookFromCartAsync(bookId));
      if (deleteBookFromCartAsync.fulfilled.match(resultAction)) {
        setAlert("Removed book from cart.");
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle shipping address
  const handleShippingAddress = (e) => {
    const addressId = e.target.value;
    const addressToShip = addresses.find(
      (address) => address._id === addressId
    );
    if (addressToShip) {
      setShippingAddress(addressToShip);
    } else {
      setShippingAddress("");
      setShowPriceDetails(false);
    }
  };

  // Show and hide order placed message
  const placeOrderHandler = async () => {
    try {
      const booksIdDB = cart.map((item) => item.book._id);
      console.log(booksIdDB);
      if (orderState.order) {
        const orderId = orderState.order._id;
        const orderData = {
          order: {
            books: booksIdDB,
            totalAmount: totalCartPrice,
            totalBookCount: totalItems,
          },
        };
        const resultAction = await dispatch(
          updateOrderAsync({ orderId, order: orderData })
        );
        if (updateOrderAsync.fulfilled.match(resultAction)) {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
          console.log(totalCartPrice);
          await dispatch(clearBooksFromCartAsync());
        }
      } else {
        const orderData = {
          order: {
            books: booksIdDB,
            totalAmount: totalCartPrice,
            totalBookCount: totalItems,
          },
        };
        const resultAction = await dispatch(saveOrderAsync(orderData));
        if (saveOrderAsync.fulfilled.match(resultAction)) {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
          await dispatch(clearBooksFromCartAsync());
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const totalItems =
    cart.length > 0 &&
    cart.reduce((acc, curr) => {
      acc = acc + curr.quantity;
      return acc;
    }, 0);

  const totalCartPrice =
    cart.length > 0 &&
    cart.reduce((acc, curr) => {
      const currFinalPrice = calculateBooksFinalPrice(
        curr.book.price,
        curr.book.discount
      );
      acc = acc + currFinalPrice * curr.quantity;
      return acc;
    }, 0);

  return (
    <>
      <Header />
      <main className="container">
        <h4 className="display-3 fw-semibold text-center py-4">
          Your Cart{" "}
          <span className="text-danger">
            ({cart.length > 0 ? totalItems : 0})
          </span>
        </h4>
        {status === "loading" && (
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <p className="fs-4 text-center-danger">{error}</p>}
        {alert && (
          <div className="row">
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
              style={{ height: "3rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                viewBox="0 0 16 16"
                role="img"
                aria-label="Warning:"
                style={{ height: "2rem" }}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <div>{alert}</div>
            </div>
          </div>
        )}
        {cart.length > 0 ? (
          <div className="row pb-5">
            <div className="col-md-8 mb-4">
              <ul className="list-group">
                {cart.map((item) => {
                  const { book } = item;
                  const booksFinalPrice = calculateBooksFinalPrice(
                    book.price,
                    book.discount
                  );
                  return (
                    <li
                      className="list-group-item d-flex flex-wrap justify-content-between"
                      key={item._id}
                    >
                      <div
                        className="d-flex flex-grow-1"
                        style={{ width: "500px" }}
                      >
                        <div className="align-items-center">
                          <Link
                            to={`/books/${book.categoryName}/${book._id}`}
                            state={books}
                          >
                            <img
                              src={book.coverImageUrl}
                              className="list-img"
                            />
                          </Link>
                        </div>
                        <div className="px-4 w-50">
                          <div className="fs-4 fw-normal">{book.title}</div>
                          <p>by {book.author}</p>
                          <p className="fs-4">
                            <span className="fw-semibold">
                              ₹{Math.round(booksFinalPrice)}
                            </span>{" "}
                            {book.discount > 0 && (
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  fontSize: "15px",
                                }}
                              >
                                M.R.P ₹{book.price}
                              </span>
                            )}{" "}
                            {book.discount > 0 && (
                              <small className="text-danger fw-bold">{`(%${book.discount} off)`}</small>
                            )}
                          </p>
                          {book.isDeliveryFree && (
                            <p className="fs-4">Free Delivery</p>
                          )}
                        </div>
                      </div>
                      <div className="card-details">
                        <div className="pb-5">
                          <lable className="fs-4">Quantity: </lable>
                          <br />
                          <button
                            style={{
                              borderRadius: "5px",
                              width: "25px",
                              height: "25px",
                              color: "white",
                              textAlign: "center",
                            }}
                            className="bg-danger"
                            onClick={() => handleIncreaseBookQuantity(item)}
                          >
                            +
                          </button>
                          <span className="fs-4 px-2">{item.quantity}</span>
                          <button
                            style={{
                              borderRadius: "5px",
                              width: "25px",
                              height: "25px",
                              color: "red",
                              textAlign: "center",
                            }}
                            className="bg-danger-subtle"
                            onClick={() => handleDecreaseBookQuantity(item)}
                          >
                            {" "}
                            -{" "}
                          </button>
                        </div>
                        <div className="d-grid gap-2 btn-group">
                          <div>
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => handleAddToWishlist(book)}
                            >
                              + Wishlist
                            </button>
                          </div>
                          <div>
                            <button
                              className="btn btn-light text-danger bg-danger-subtle w-100"
                              type="button"
                              onClick={() => handleRemoveFromCart(item._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img
                    src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    className="img-fluid"
                    style={{ height: "76px", borderRadius: "50%" }}
                  />
                  <p className="fs-5 pt-2">
                    John Doe <br /> +1-555‑0100 <br />
                    johndoe@testemail.com
                  </p>
                  {shippingAddress !== "" && (
                    <p className="fs-5">
                      Shipping Address- <br /> {shippingAddress.houseNumber},{" "}
                      {shippingAddress.street}, {shippingAddress.city},{" "}
                      {shippingAddress.state}, {shippingAddress.country} -{" "}
                      {shippingAddress.postalCode}
                    </p>
                  )}
                  <select
                    className="form-select"
                    onChange={handleShippingAddress}
                  >
                    <option value="">Select Shipping Address</option>
                    {addresses.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.houseNumber}, {address.street}, {address.city},{" "}
                        {address.state}, {address.country} -{" "}
                        {address.postalCode}
                      </option>
                    ))}
                  </select>
                  <hr />
                  <p className="fs-4 fw-semibold">Order Summary</p>
                  {showPriceDetails && (
                    <div>
                      <div className="row">
                        <div className="col-6">
                          <span>Items ({totalItems} Items)</span>
                          <br />
                          <span>Delivery</span>
                          <br />
                          <span>Discount</span>
                        </div>
                        <div className="col-6">
                          <span>{Math.ceil(totalCartPrice).toFixed(2)}</span>
                          <br />
                          <span>80.00</span>
                          <br />
                          <span>80.00</span>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-6">
                          <div className="fs-5 fw-semibold text-danger">
                            Subtotal:
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="fs-5">
                            ₹ {Math.ceil(totalCartPrice).toFixed(2)}/-
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-danger mt-3 w-100"
                        onClick={() => placeOrderHandler()}
                      >
                        Place order
                      </button>
                    </div>
                  )}

                  <div className="d-grid gap-2 pt-3">
                    <button
                      className="btn btn-danger"
                      style={{ display: showPriceDetails ? "none" : "block" }}
                      disabled={shippingAddress ? false : true}
                      type="button"
                      onClick={() => setShowPriceDetails(true)}
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{ display: showMessage ? "block" : "none" }}
                class="alert alert-success mt-3 text-success fw-semibold"
                role="alert"
              >
                ✅ Order Placed Successfully.
              </div>
            </div>
          </div>
        ) : (
          <p className="fs-4 fw-semibold text-center">Add Books to Cart!</p>
        )}
      </main>
    </>
  );
};

export default CartView;
