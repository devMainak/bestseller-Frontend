import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopRated = ({}) => {
  // Accessing books
  const { books, status, error } = useSelector((state) => state.books);

  // Filtering trending books
  const trendingBooks = books.filter((book) => book.rating >= 9);

  return (
    <div>
      <section className="bg-danger-subtle py-4">
        <div className="container">
        <h4 className="display-4 text-center pb-4" style={{ fontFamily: "Noto Serif" }}>
            <em>Top Rated</em>
          </h4>
          {status === "loading" && (
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {error && <p className="fs-4 fw-normal">{error}</p>}
          {trendingBooks.length > 0 && (
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {trendingBooks.map((book) => (
                <div
                  className="card position-relative"
                  style={{ width: "240px", height: "450px" }}
                  key={book._id}
                >
                  <Link
                    to={`books/${book.categoryName}/${book._id}`}
                    state={books}
                  >
                    <img
                      src={book.coverImageUrl}
                      className="card-img-top img-fluid px-2 pt-2"
                      style={{ maxHeight: "300px" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">by {book.author}</p>
                    <div
                      className="d-flex justify-content-between position-absolute"
                      style={{
                        top: "400px",
                        right: 0,
                        left: 0,
                        padding: "0 16px",
                      }}
                    >
                      <div>
                        <button className="btn btn-sm btn-danger">
                          ⭐ {book.rating.toFixed(1)}
                        </button>
                      </div>
                      <div>
                        <div className="card-text fs-5 fw-semibold">
                          ₹ {book.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopRated;
