import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookList = ({ books }) => {
  // accessing status and error from store.books for loading handling
  const { status, error } = useSelector(state => state.books);

  return (
    <div className="py-4 container" style={{ width: "100%" }}>
      {status === "loading" && (
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <p className="fs-4 fw-normal">{error}</p>}
      <div className="row">
        {books.length > 0 && books.map((book) => {
          return (
            <div className="col-sm-6 col-lg-4 mb-3" key={book._id}>
              <Link to={`/books/${book.categoryName}/${book._id}`} state={books} style={{ textDecoration: "none" }}>
                <div className="card h-100">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={book.coverImageUrl}
                        className="img-fluid rounded-start"
                        alt={book.title}
                        style={{ height: "100%" }}
                      />
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
                          <button className="btn btn-danger" type="button">
                            Add to Cart
                          </button>
                          <button
                            className="btn btn-light text-danger bg-danger-subtle"
                            type="button"
                          >
                            Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
