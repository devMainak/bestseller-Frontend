import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addBookToWishlistAsync } from "../wishlist/wishlistSlice";
import { addBookToCartAsync, updateBookInCartAsync } from "../cart/cartSlice";
import { calculateBooksFinalPrice } from "./BookList";
import Header from "../../components/Header";
import { useState } from "react";

const BookDetails = () => {
  // Configuring dispatch for usage
  const dispatch = useDispatch();
  // Alert state variable
  const [alert, setAlert] = useState("");
  // Extracting wishlist for validation
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  // Configuring location for usage
  const location = useLocation();
  // Extracting books from state
  const books = location.state;
  // Extracting bookId using useParams()
  const { bookId } = useParams();

  // Finding the book from books state array
  const book = books.find((book) => book._id == bookId);

  // Async function to handle addition and validation to Wishlist
  const handleAddToWishlist = async (bookToSave) => {
    if (wishlist.some((item) => item.book._id === bookToSave._id)) {
      setAlert("Book is already in Wishlist");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else {
      try {
        const resultAction = await dispatch(
          addBookToWishlistAsync({ book: bookToSave._id })
        );
        if (addBookToWishlistAsync.fulfilled.match(resultAction)) {
          setAlert("Book successfully added to Wishlist");
        }
        setTimeout(() => {
          setAlert("");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Async function to handle addition and validation to cart
  const handleAddToCart = async (bookToSave) => {
    const bookToUpdate = cart.find((item) => item.book._id === bookToSave._id);
    try {
      if (bookToUpdate) {
        const updatedQuantity = Number(bookToUpdate.quantity) + 1; // Ensure quantity is a number
        const updatedBook = { ...bookToUpdate, quantity: updatedQuantity };

        const resultAction = await dispatch(
          updateBookInCartAsync({ bookId: updatedBook._id, book: updatedBook })
        );

        if (updateBookInCartAsync.fulfilled.match(resultAction)) {
          setAlert("Book quantity updated successfully in cart.");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } else {
        const resultAction = await dispatch(
          addBookToCartAsync({ book: bookToSave._id })
        );
        if (addBookToCartAsync.fulfilled.match(resultAction)) {
          setAlert("Added to cart");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate Final price
  const booksFinalPrice = calculateBooksFinalPrice(book.price, book.discount);

  return (
    <>
      <Header />
      <main className="container">
        <div
          className="d-flex details-container justify-content-center py-5"
          style={{ gap: "2rem" }}
        >
          <div>
            <img
              src={`${book.coverImageUrl}`}
              className="img-fluid"
              style={{ maxHeight: "50vh", maxWidth: "40vw" }}
            />
          </div>
          <div className="mx-4" style={{ minxHeight: "50vh" }}>
            <h3 className="display-3 fw-semibold">{book.title}</h3>
            <p className="fs-4 fw-normal">
              by {book.author}, published in {book.publishedYear}
            </p>
            <p className="card-text btn btn-danger">
              ⭐ {book.rating.toFixed(1)}
            </p>
            <p className="fs-5">{book.summary}</p>
            <hr />
            <div className="d-flex justify-content-evenly">
              <div>
                <p className="fs-4 text-center">
                  📚 <br /> {book.categoryName}
                </p>
              </div>
              <div>
                <p className="fs-4 text-center">
                  🗺 <br />
                  {book.country}
                </p>
              </div>
              <div>
                <p className="fs-4 text-center">
                  友達 <br />
                  {book.language}
                </p>
              </div>
            </div>
            <hr />
            <p className="card-text fs-4">
              Price: <br />{" "}
              <span className="fw-semibold">
                ₹{Math.round(booksFinalPrice)}
              </span>{" "}
              {book.discount > 0 && (
                <span
                  style={{ textDecoration: "line-through", fontSize: "15px" }}
                >
                  M.R.P ₹{book.price}
                </span>
              )}{" "}
              {book.discount > 0 && (
                <small className="text-danger fw-bold">{`(%${book.discount} off)`}</small>
              )}
            </p>
            <p className="card-text fs-4">Free Delivery</p>
            <div className="d-grid gap-2">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleAddToCart(book)}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-light text-danger bg-danger-subtle"
                type="button"
                onClick={() => handleAddToWishlist(book)}
              >
                Add to Wishlist
              </button>
            </div>
            {alert && (
              <div className="row mt-3">
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
          </div>
        </div>
      </main>
    </>
  );
};

export default BookDetails;
