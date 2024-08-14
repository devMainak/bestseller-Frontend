import { useEffect } from "react";
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
import { useParams, useSearchParams, Outlet } from "react-router-dom";
import { fetchWishlist } from "../wishlist/wishlistSlice";
import { fetchCart } from "../cart/cartSlice";

const BookView = () => {
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
    console.log(sortByRating);
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

  // Filtered books by category
  const filteredBooksByCategory = categoryFilter &&  books.filter((book) =>
    categoryFilter.includes(book.categoryName),
  );

  // Sorted books by priceSlider value
  const sortedBooksByPriceSlider = filteredBooksByCategory && filteredBooksByCategory.filter(
    (book) => book.price > priceSlider,
  );

  // Sorted books by rating
  const sortedBooksByRating = sortedBooksByPriceSlider && sortedBooksByPriceSlider.filter(
    (book) => book.rating >= sortByRating,
  );

  // Sorted book by price
  const sortedBooksByPrice =
    sortedBooksByRating && sortByPrice === "HighToLow"
      ? sortedBooksByRating.sort((a, b) => b.price - a.price)
      : sortedBooksByRating.sort((a, b) => a.price - b.price);

  // Finding the searched book
  const searchedBook = query && books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()),
  );

  console.log(searchedBook)

  return (
    <>
      <Header />
      <main>
        <div className="d-flex">
          <div
            className="align-items-start text-light bg-danger px-5 py-4"
            style={{ minWidth: "3in", height: "100vh", position: "fixed" }}
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
          </div>
          <div style={{ marginLeft: "3in", padding: "1rem" }}>
            <BookList books={searchedBook ? searchedBook : sortedBooksByPrice} />
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default BookView;
