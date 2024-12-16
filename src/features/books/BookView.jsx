import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import BookList from "./BookList";
import {
  fetchBooks,
  addToCategoryFilter,
  removeFromCategoryFilter,
  setPriceSlider,
  setSortByRating,
  setSortByPrice,
  clearFilters,
} from "./booksSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchWishlist } from "../wishlist/wishlistSlice";
import { fetchCart } from "../cart/cartSlice";

const BookView = () => {
  const [filterDisplay, setFilterDisplay] = useState(false);

  // making use of the useDispatch hook
  const dispatch = useDispatch();
  // Configuring search params for usage
  const [searchParams] = useSearchParams();
  // extracting book category using useParams
  const { bookCategory } = useParams();
  // Etracting search query
  const query = searchParams.get("query");

  // Fetching books on page load && setting bookCategory on page load && Wishlist for validation
  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchWishlist());
    dispatch(fetchCart());
    dispatch(clearFilters());
    if (bookCategory) {
      dispatch(addToCategoryFilter(bookCategory));
    }
  }, []);

  // Destructuring the booksSlice and accessing the store with useSelector
  const {
    books,
    categoryFilter,
    priceSlider,
    categories,
    sortByRating,
    sortByPrice,
  } = useSelector((state) => state.books);

  // Function to set the priceSlider value upon change
  const handlePriceSlider = (event) => {
    const value = event.target.value;
    dispatch(setPriceSlider(parseFloat(value)));
  };

  // Function to handle categories and categoryFilters
  const handleCategoryFilter = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(addToCategoryFilter(value));
    } else {
      dispatch(removeFromCategoryFilter(value));
    }
  };

  // Function to set the current rating filter
  const handleRatingFilter = (e) => {
    dispatch(setSortByRating(parseInt(e.target.value)));
  };

  // Function to set the current price sort method
  const handleSortByPrice = (e) => {
    dispatch(setSortByPrice(e.target.value));
  };

  // Function to clear and reset all filters
  const clearAllFilters = () => {
    dispatch(clearFilters());
    dispatch(addToCategoryFilter(bookCategory));
  };

  // Filtered books
  const filteredBooks = books
    .filter((book) =>
      categoryFilter.length > 0
        ? categoryFilter.includes(book.categoryName)
        : true
    )
    .filter((book) => book.price >= priceSlider)
    .filter((book) => book.rating >= sortByRating);

  // Sorted book by price
  const sortedBooksByPrice =
    sortByPrice === "HighToLow"
      ? [...filteredBooks].sort((a, b) => b.price - a.price)
      : [...filteredBooks].sort((a, b) => a.price - b.price);

  // Finding the searched book
  const finalBooks =
    query && query.trim() !== ""
      ? sortedBooksByPrice.filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        )
      : sortedBooksByPrice;
  console.log(finalBooks);

  return (
    <>
      <Header />
      <main>
        <button
          className="filter-btn text-light fs-4 py-3"
          onClick={() =>
            setFilterDisplay(filterDisplay === true ? false : true)
          }
        >
          Filters
        </button>
        <div className="d-flex flex-column flex-md-row">
          <div
            className="filter-bar flex-grow-1 align-items-start text-light bg-danger px-5 py-4"
            style={{ display: filterDisplay ? "block" : "none" }}
          >
            <section className="py-3 d-flex justify-content-between">
              <lable className="fs-5 fw-normal">Filters</lable>
              <button
                className="btn btn-outline-light fw-semibold"
                onClick={clearAllFilters}
              >
                Clear
              </button>
            </section>
            <section className="pb-4">
              <label for="priceRange" className="form-label fs-5 fw-normal">
                Price
              </label>
              <div className="d-flex justify-content-between">
                <span>100</span>
                <span>500</span>
                <span>1000</span>
              </div>
              <input
                type="range"
                className="form-range"
                id="priceRange"
                min={100}
                max={1000}
                value={priceSlider}
                onChange={handlePriceSlider}
              />
            </section>
            <section className="pb-4">
              <label className="fs-5 fw-normal pb-2">Category</label>
              <br />
              {categories.map((category) => (
                <div key={category.name}>
                  <label className="pt-2">
                    <input
                      type="checkbox"
                      value={category.name}
                      checked={category.checked}
                      onChange={handleCategoryFilter}
                    />{" "}
                    {category.name}
                  </label>
                  <br />
                </div>
              ))}
            </section>
            <section className="pb-4">
              <label className="fs-5 fw-normal pb-2">Rating</label>
              <br />
              <label className="pt-2">
                <input
                  type="radio"
                  name="rating"
                  value={9}
                  onChange={handleRatingFilter}
                />{" "}
                9 & above
              </label>
              <br />
              <label className="pt-2">
                <input
                  type="radio"
                  name="rating"
                  value={8}
                  onChange={handleRatingFilter}
                />{" "}
                8 & above
              </label>
              <br />
              <label className="pt-2">
                <input
                  type="radio"
                  name="rating"
                  value={7}
                  onChange={handleRatingFilter}
                />{" "}
                7 & above
              </label>
              <br />
              <label className="pt-2">
                <input
                  type="radio"
                  name="rating"
                  value={6}
                  onChange={handleRatingFilter}
                  checked={sortByRating === 6 ? true : false}
                />{" "}
                6 & above
              </label>
            </section>
            <section className="pb-4">
              <label className="fs-5 fw-normal pb-2">Sort by</label>
              <br />
              <label className="pt-2">
                <input
                  type="radio"
                  name="sortBy"
                  value="LowToHigh"
                  onChange={handleSortByPrice}
                />{" "}
                Price - Low to High
              </label>
              <br />
              <label className="pt-2">
                <input
                  type="radio"
                  name="sortBy"
                  value="HighToLow"
                  onChange={handleSortByPrice}
                  checked={sortByPrice === "HighToLow" ? true : false}
                />{" "}
                Price - High to Low
              </label>
            </section>
            <section className="py-3 d-flex justify-content-end">
              <button
                className="btn-outline-light apply-filter-btn fw-semibold"
                onClick={() =>
                  setFilterDisplay(filterDisplay === true ? false : true)
                }
              >
                Apply
              </button>
            </section>
          </div>
          <div className="main-content flex-grow-1">
            <BookList books={finalBooks} />
          </div>
        </div>
      </main>
    </>
  );
};

export default BookView;
