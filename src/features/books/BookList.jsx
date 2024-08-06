import { useSelector } from "react-redux";

const BookList = ({ books }) => {
  // accessing status and error from store.books for loading handling
  const { status, error } = useSelector(state => state.books)
  
  return (
      <div className="py-4 container">
        {status === "loading" && <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>}
        {error && <p className="fs-4 fw-normal">{error}</p>}
        <div className="row">
          {books.length > 0 && books.map((book) => {
            return (
              <div className="col-sm-6" key={book._id}>
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={book.coverImageUrl}
                        class="img-fluid rounded-start"
                        alt={book.title}
                        style={{ maxHeight: "265px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text">by {book.author}</p>
                        <p className="card-text btn btn-danger">
                          ⭐ {book.rating}
                        </p>
                        <p className="fs-5 fw-normal">₹{book.price}</p>
                        <div class="d-grid gap-2">
                          <button class="btn btn-danger" type="button">
                            Add to Cart
                          </button>
                          <button
                            class="btn btn-light text-danger bg-danger-subtle"
                            type="button"
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
          })}
        </div>
      </div>
  );
};
export default BookList;
