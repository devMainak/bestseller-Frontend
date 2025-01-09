import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../features/categories/CategoryList";
import { useEffect } from "react";
import { fetchBooks } from "../features/books/booksSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import TopRated from "../features/toprated/TopRated";
import Trending from "../features/trending/Trending";
import { fetchOrderAsync } from "../features/orderhistory/orderHistorySlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBooks());
    dispatch(fetchOrderAsync());
  }, []);

  const { categories } = useSelector((state) => state.categories);

  return (
    <div>
      <section className="">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://i.pinimg.com/564x/0e/bb/64/0ebb6477186da4a48ea616925f1573f9.jpg"
                className="img-fluid d-block w-100"
                style={{ height: "500px" }}
                alt="..."
              />
              <div className="card-img-overlay text-light align-self-center">
                <h1 className="text-center display-1 fw-semibold">
                  Explore Books
                </h1>
              </div>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/916/224/non_2x/promo-banner-with-stack-of-books-globe-inkwell-quill-plant-lantern-ebook-world-book-day-bookstore-bookshop-library-book-lover-bibliophile-education-for-poster-cover-advertising-vector.jpg"
                  className="img-fluid d-block w-100"
                  style={{ height: "500px" }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://i.pinimg.com/564x/e0/90/11/e09011b008b169b474f01bee05328d01.jpg"
                  className="img-fluid d-block w-100"
                  style={{ height: "500px" }}
                  alt="..."
                />
                <div className="card-img-overlay text-light align-self-center">
                  <p className="text-center text-dark fs-4 fw-semibold">
                    <em style={{ fontFamily: "Noto Serif" }}>
                      “If you only read the books that everyone else is reading,{" "}
                      <br /> you can only think what everyone else is thinking.”
                      <br />
                      <span className="text-white">- Haruki Murakami </span>
                    </em>
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <CategoryList categories={categories} />
      <hr className="container" />
      <Trending />
      <TopRated />
    </div>
  );
};

export default Home;
