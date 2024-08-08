import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";

const BookDetails = () => {
  // Configuring location for usage
  const location = useLocation();
  // Extracting books from state
  const books = location.state;
  // Extracting bookId using useParams()
  const { bookId } = useParams();

  // Finding the book from books state array
  const book = books.find((book) => book._id === bookId);

  return (
    <>
      <Header />
      <main className="container">
        <div className="d-flex justify-content-between pt-5">
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
            <hr/>
            <div className="d-flex justify-content-evenly">
              <div>
                <p className="fs-4 text-center">📚 <br/> {book.categoryName}</p>
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
              Price: <br />₹ {book.price}/-
            </p>
            <p className="card-text fs-4">Free Delivery</p>
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
      </main>
    </>
  );
};

export default BookDetails;
