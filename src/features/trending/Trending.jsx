import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { calculateBooksFinalPrice } from "../books/BookList";

const Trending = () => {
  const { books, status, error } = useSelector((state) => state.books);

  const trendingBooks = books.filter((book) => book.discount > 15);

  return (
    <div>
      <section className="py-4">
        <div className="container">
          <h4
            className="display-4 text-center pb-4"
            style={{ fontFamily: "Noto Serif" }}
          >
            <em>Bestsellers</em>
          </h4>
          {status === "loading" && (
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {error && <p className="fs-4 fw-normal">{error}</p>}
          {trendingBooks.length > 0 && (
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {trendingBooks.map((book) => {
                const bookPrice = calculateBooksFinalPrice(
                  book.price,
                  book.discount
                );
                return (
                  <div
                    className="card position-relative"
                    style={{ width: "240px", height: "450px" }}
                    key={book._id}
                  >
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      -{book.discount} %
                      <span class="visually-hidden">unread messages</span>
                    </span>
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
                      <h5 className="card-title">
                        {book.title.split(" ").slice(0, 5).join(" ")}...
                      </h5>
                      <p className="card-text">by {book.author}</p>
                      <div
                        className="d-flex justify-content-between position-absolute"
                        style={{
                          top: "410px",
                          right: 0,
                          left: 0,
                          padding: "0 16px",
                        }}
                      >
                        <div>
                          <small
                            className="text-danger"
                            style={{
                              fontSize: "14px",
                              textDecoration: "line-through",
                            }}
                          >
                            M.R.P ₹ {book.price}
                          </small>
                        </div>
                        <div>
                          <div className="card-text fs-5 fw-semibold">
                            ₹ {Math.ceil(bookPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Trending;
