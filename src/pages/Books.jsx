import { useEffect, useState } from "react"
import Header from "../components/Header"
import useFetch from "../useFetch"
import { useParams } from "react-router-dom"

const Books = () => {
  const [booksToShow, setBooksToShow] = useState()
  const [priceSlider, setPriceSlider] = useState(100)
  const [categoryFilter, setCategoryFilter] = useState([])

  const { data, loading, error } = useFetch('https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/books')
  const { bookCategory } = useParams('bookCategory')
  
  useEffect(() => {
    
    if (bookCategory === 'all')
    {
      if (data) {
        setBooksToShow(data.data.books)
      }
    } else {
      if (data) {
        setBooksToShow(data.data.books.filter((book) => book.categoryName === bookCategory))
      }
    }
  }, [data, bookCategory])

  const handlePriceSlider = (event) => {
    const value = event.target.value
    setPriceSlider(value)
    if (bookCategory !== 'all')
    {
      const filteredBooks = data.data.books.filter((book) => book.categoryName === bookCategory)
      setBooksToShow(prevBooks => value > priceSlider ? prevBooks.filter(book => book.price > priceSlider) : filteredBooks.filter(book => book.price > priceSlider))
    } else {
      setBooksToShow(prevBooks => value > priceSlider ? prevBooks.filter(book => book.price > priceSlider) : data.data.books.filter(book => book.price > priceSlider))
    }
  }

  const handleCategoryFilter = (e) => {
    // const { value, checked } = e.target
      
    // if (checked)
    // {
    //   setCategoryFilter((prevBooks) => [...prevBooks, value])
    // } else {
    //   setCategoryFilter((prevBooks) => prevBooks.filter(book => book.categoryName !== value))
    //   }

    // if (bookCategory === 'all')
    // {
    //   setBooksToShow(() => data.data.books.filter(book => categoryFilter.includes(book.categoryName)))
    // }
  }

  const handleRatingFilter = (e) => {
    const { value } = e.target
    if (bookCategory !== 'all')
    {
      const filteredBooks = data.data.books.filter((book) => book.categoryName === bookCategory)
    setBooksToShow(filteredBooks.filter(book => book.rating > value))
    } else {
      setBooksToShow(data.data.books.filter(book => book.rating > value))
    }
  }
  
  return (
    <>
      <Header/>
      <main>
        <div className="d-flex">
          <div className="align-items-start text-light bg-danger px-5 py-4" style={{minWidth: "3in", height: "1080px"}}>
            <section className="py-3 d-flex justify-content-between">
              <lable className="fs-5 fw-normal">Filters</lable>
              <button className="btn btn-outline-light fw-semibold">Clear</button>
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
              <label className="pt-2"><input type="checkbox" value="Fiction" onChange={handleCategoryFilter}/> Fiction</label>
              <br/>
              <label className="pt-2"><input type="checkbox" value="Non-Fiction" onChange={handleCategoryFilter}/> Non-Fiction</label>
              <br/>
              <label className="pt-2"><input type="checkbox" value="Business" onChange={handleCategoryFilter}/> Business</label>
              <br/>
              <label className="pt-2"><input type="checkbox" value="Psychology" onChange={handleCategoryFilter}/> Psychology</label>
              <br/>
              <label className="pt-2"><input type="checkbox" value="Self-Help" onChange={handleCategoryFilter}/> Self-Help</label>
            </section>
            <section className="pb-4">
            <label className="fs-5 fw-normal pb-2">Rating</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={9} onChange={handleRatingFilter}/> 9 & above</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={8} onChange={handleRatingFilter}/> 8 & above</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={7} onChange={handleRatingFilter}/> 7 & above</label>
              <br/>
              <label  className="pt-2"><input type="radio" name="rating" value={6} onChange={handleRatingFilter}/> 6 & above</label>
            </section>
            <section className="pb-4">
              <label className="fs-5 fw-normal pb-2">Sort by</label>
              <br/>
              <label className="pt-2"><input type="radio" name="sortBy" /> Price - Low to High</label>
              <br/>
              <label className="pt-2"><input type="radio" name="sortBy" /> Price - High to Low</label>
            </section>
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

export default Books