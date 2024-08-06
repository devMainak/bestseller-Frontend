import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { fetchBooks, addToCategoryFilter, removeFromCategoryFilter, setPriceSlider } from "./booksSlice"
import { useParams } from "react-router-dom"

const BookList = () => {
  // makig use of the useDispatch hook
  const dispatch = useDispatch()

  // Fetching books on page load using useEffect
  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  // extracting book category using useParams
  const { bookCategory } = useParams()
  
  // State variable for the current state of books 
  const [booksToShow, setBooksToShow] = useState([])
  const [selectedRating, setSelectedRating] = useState(6)

  // setting bookCategory on page load && booksToShow with primary category
  useEffect(() => {
    dispatch(addToCategoryFilter(bookCategory))
  }, [])
  
  // Destructuring the booksSlice and accessing the store with useSelector
  const { books, status, error, categoryFilter, priceSlider, categories, sortByRating } = useSelector(state => state.books)

  // Function to set the priceSlider value upon change
  const handlePriceSlider = (event) => {
    dispatch(setPriceSlider(event.target.value))
  }

  // Filtered books by category
  const filteredBooksByCategory = categoryFilter.length > 0 ? books.filter(book => categoryFilter.includes(book.categoryName))

  // sorted books by priceSlider value
    const sortedBooksByCategory = filteredBooksByCategory.filter(book => book.price > priceSlider)

  // Function to handle categories and categoryFilters
  const handleCategoryFilter = (e) => {
    const { value, checked } = e.target
    // console.log(checked)
    
    if (checked) {
      dispatch(addToCategoryFilter(value))
    } else {
      dispatch(removeFromCategoryFilter(value))
    }
    
      // console.log(categoryFilter)
      // console.log(booksToShow)
  }

  const handleRatingFilter = (e) => {
    const { value } = e.target

    const filteredBooks = data.data.books.filter((book) => categoryFilter.includes(book.categoryName) && book.price > priceSlider)
      setSelectedRating(value)
      setBooksToShow(filteredBooks.filter(book => book.rating > value))

    
  }

  const clearFilters = () => {
    setPriceSlider(100)
    setCategoryFilter([bookCategory])
    setSelectedRating(6)
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        checked: category.name === bookCategory
      }))
    )
    
    // const filteredBooks = data.data.books.filter(book => categoryFilter.includes(book.categoryName))
    // setBooksToShow(filteredBooks)
  }

  // const handleClearButton = () => {
  //   clearFilters()

    
  // }
  
  return (
    <>
      <Header/>
      <main>
        <div className="d-flex">
          <div className="align-items-start text-light bg-danger px-5 py-4" style={{minWidth: "3in", height: "100vh", position: "fixed"}}>
            <section className="py-3 d-flex justify-content-between">
              <lable className="fs-5 fw-normal">Filters</lable>
              <button className="btn btn-outline-light fw-semibold" onClick={clearFilters}>Clear</button>
            </section>
            <section className="pb-4">
              <label for="priceRange" className="form-label fs-5 fw-normal">Price</label>
              <div className="d-flex justify-content-between">
                <span>100</span>
                <span>500</span>
                <span>1000</span>
              </div>
              <input type="range" className="form-range" id="priceRange" min={100} max={1000} value={priceSlider} onChange={handlePriceSlider}/>
            </section>
            <section className="pb-4">
              <label className="fs-5 fw-normal pb-2">Category</label>
              <br/>
          {categories.map((category) => (         
      <div>
      <label key={category.name} className="pt-2">
                  <input type="checkbox" value={category.name} checked={category.checked} onChange={handleCategoryFilter} /> {category.name}
                </label>
                <br/>
        </div>
              ))}
            </section>
            <section className="pb-4">
            <label className="fs-5 fw-normal pb-2">Rating</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={9} onChange={handleRatingFilter}  /> 9 & above</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={8} onChange={handleRatingFilter} /> 8 & above</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={7} onChange={handleRatingFilter} /> 7 & above</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={6} onChange={handleRatingFilter} checked={selectedRating === 6 ? true : false} /> 6 & above</label>
            </section>
            {/* <section className="pb-4">
              <label className="fs-5 fw-normal pb-2">Sort by</label>
              <br/>
              <label className="pt-2"><input type="radio" name="sortBy" /> Price - Low to High</label>
              <br/>
              <label className="pt-2"><input type="radio" name="sortBy" /> Price - High to Low</label>
            </section> */}
          </div>
          <div className="py-4 container">
            {booksToShow ? 
              <div className="row">
                {booksToShow.map(book => {
                return (
                  <div className="col-sm-6">
                    <div className="card mb-3" style={{maxWidth: "540px"}}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img src={book.coverImageUrl} class="img-fluid rounded-start" alt={book.title} style={{maxHeight: "265px"}}/>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">by {book.author}</p>
                            <p className="card-text btn btn-danger">⭐ {book.rating}</p>
                            <p className="fs-5 fw-normal">₹{book.price}</p>
                            <div class="d-grid gap-2">
                              <button class="btn btn-danger" type="button">Add to Cart</button>
                              <button class="btn btn-light text-danger bg-danger-subtle" type="button">Add to Wishlist</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                })}
              </div> :  loading && <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            }
            

          </div>
        </div>
      
      </main>
    </>
  )
}

export default BookList