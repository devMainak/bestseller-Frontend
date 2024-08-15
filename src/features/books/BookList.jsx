import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBookToWishlistAsync } from "../wishlist/wishlistSlice";
import { useState } from "react";
import { addBookToCartAsync, updateBookInCartAsync } from "../cart/cartSlice";

const BookList = ({ books }) => {
  // State variable for alert
  const [alert, setAlert] = useState("");
  // Configuring useDispatch for usage
  const dispatch = useDispatch();
  // Accessing status and error from store.books for loading handling
  const { status, error } = useSelector((state) => state.books);
  // Accessing wishlist to validate addition and deletion
  const { wishlist } = useSelector((state) => state.wishlist);
  // Accessing cart to validate addition and deletion
  const { cart } = useSelector(state => state.cart)


  // Async function to handle addition and validation to Wishlist
  const handleAddToWishlist = async (bookToSave) => {
    if (wishlist.some((book) => book.title === bookToSave.title)) {
      setAlert("Book is already in Wishlist");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    } else {
      try {
        const resultAction = await dispatch(addBookToWishlistAsync(bookToSave));
        if (addBookToWishlistAsync.fulfilled.match(resultAction)) {
          setAlert("Book successfully added to Wishlist");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Async function to handle addition and validation to cart
  const handleAddToCart = async (bookToSave) => {
    const bookToUpdate = cart.find(book => book.title === bookToSave.title)
    try {
    if (bookToUpdate) {
      const updatedQuantity = Number(bookToUpdate.quantity) + 1; // Ensure quantity is a number
      const updatedBook = { ...bookToUpdate, quantity: updatedQuantity };

      const resultAction = await dispatch(updateBookInCartAsync({bookId: updatedBook._id, book: updatedBook}));
     
      if (updateBookInCartAsync.fulfilled.match(resultAction))
      {
        setAlert("Book quantity updated successfully in cart.")
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
    } else {
      const resultAction = await dispatch(addBookToCartAsync(bookToSave))
      if (addBookToCartAsync.fulfilled.match(resultAction))
      {
        setAlert("Added to cart")
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
    }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="my-4 container" style={{ width: "100%" }}>
      {status === "loading" && (
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <p className="fs-4 fw-normal">{error}</p>}
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
      <div className="row">
        {books.length > 0 ?
          books.map((book) => {
            return (
              <div className="col-sm-6 mb-3" key={book._id}>
                <div className="card h-100">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <Link
                        to={`/books/${book.categoryName}/${book._id}`}
                        state={books}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={book.coverImageUrl}
                          className="img-fluid rounded-start"
                          alt={book.title}
                          style={{ height: "100%" }}
                        />
                      </Link>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text">by {book.author}</p>
                        <p className="card-text btn btn-danger">
                          ⭐ {book.rating.toFixed(1)}
                        </p>
                        <p className="fs-5 fw-normal">₹{book.price}</p>
                        <div className="d-grid gap-2">
                          <button className="btn btn-danger" type="button" onClick={() => handleAddToCart(book)}>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : <p className="text-center fs-4">No books found!</p>}
      </div>
    </div>
  );
};

export default BookList;
