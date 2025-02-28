import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, deleteBookFromWishlistAsync } from "./wishlistSlice";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { fetchBooks } from "../books/booksSlice";
import {
  fetchCart,
  addBookToCartAsync,
  updateBookInCartAsync,
} from "../cart/cartSlice";

const Wishlist = () => {
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchBooks());
    dispatch(fetchCart());
  }, []);

  const { wishlist, status, error } = useSelector((state) => state.wishlist);
  const { books } = useSelector((state) => state.books);
  const { cart } = useSelector((state) => state.cart);

  // Async function to delete book from wishlist on click of btn
  const handleDeleteFromWishlist = async (bookId) => {
    try {
      const resultAction = await dispatch(deleteBookFromWishlistAsync(bookId));
      if (deleteBookFromWishlistAsync.fulfilled.match(resultAction)) {
        setAlert("Removed book from Wishlist.");
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Async function to move book from wishlist to cart
  const handleMoveToCart = async (bookToSave) => {
    const bookToUpdate =
      cart.length > 0 && cart.find((item) => item.book._id === bookToSave._id);
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

  return (
    <>
      <Header />
      <main className="container">
        <h4 className="display-3 fw-semibold text-center py-4">
          Your Wishlist{" "}
          <span className="text-danger">
            ({wishlist.length > 0 ? wishlist.length : 0})
          </span>
        </h4>
        <section>
          {status === "loading" && (
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {error && <p className="fs-4 text-center-danger">{error}</p>}
          {alert && (
            <div className="row">
              <div
                className="alert alert-success d-flex justify-items-center"
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
          {wishlist.length > 0 ? (
            <ul className="list-group pb-5">
              {wishlist.map((item) => {
                const { book } = item;

                return (
                  <li className="list-group-item" key={item._id}>
                    <div className="d-flex justify-content-between flex-wrap">
                      <div className="d-flex flex-grow-1 pb-4">
                        <div>
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
                        <div className="mx-4" style={{ width: "600px" }}>
                          <p className="fs-4 fw-normal w-50">{book.title}</p>
                          <p>by {book.author}</p>
                          <p className="card-text btn btn-danger">
                            ⭐ {book.rating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-danger"
                            style={{ width: "300px" }}
                            type="button"
                            onClick={() => handleMoveToCart(book)}
                          >
                            Move to Cart
                          </button>
                          <button
                            className="btn btn-danger text-danger bg-danger-subtle"
                            style={{ width: "300px" }}
                            type="button"
                            onClick={() => handleDeleteFromWishlist(item._id)}
                          >
                            Remove from Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="fs-4 fw-semibold text-center">
              Your wishlist is empty!
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Wishlist;
