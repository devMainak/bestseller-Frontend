import { useEffect, useState } from "react"
import Header from "../components/Header"
import useFetch from "../useFetch"
import { useParams } from "react-router-dom"

const Books = () => {
  const [booksToShow, setBooksToShow] = useState()
  const [priceSlider, setPriceSlider] = useState(100)
  const [categoryFilter, setCategoryFilter] = useState([])
  const [selectedRating, setSelectedRating] = useState(6)
  const [categories, setCategories] = useState([
    {
      name: "Fiction",
      checked: false
    },
    {
      name: "Non-Fiction",
      checked: false
    },
    {
      name: "Business",
      checked: false
    },
    {
      name: "Psychology",
      checked: false
    },
    {
      name: "Self-Help",
      checked: false
    }
  ])

  const { data, loading, error } = useFetch('https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/books')
  const { bookCategory } = useParams('bookCategory')
  
  useEffect(() => {
    
    
      if (data) {
        setCategoryFilter(prevCategorise => [...prevCategorise, bookCategory])
        setBooksToShow(data.data.books.filter((book) => categoryFilter.includes(book.categoryName)))
      }
    
  }, [data, bookCategory])

  const handlePriceSlider = (event) => {
    const value = event.target.value
    setPriceSlider(value)
    
      const filteredBooks = data.data.books.filter((book) => categoryFilter.includes(book.categoryName))
      setBooksToShow(prevBooks => value > priceSlider ? prevBooks.filter(book => book.price > priceSlider && book.rating > selectedRating) : filteredBooks.filter(book => book.price > priceSlider && book.rating > selectedRating))
    
  }

  useEffect(() => {
    if (data)
    {
      if (categoryFilter.length < 1)
        {
          setCategoryFilter((prevCategories) => [...prevCategories, bookCategory])
        }
      if (categoryFilter.length > 0)
      {
       setCategories(categories => categories.map(category => {
         if (categoryFilter.includes(category.name))
         {
           category.checked = true
           return category
         } else {
           return category
         }
       }))
        setBooksToShow(data.data.books.filter(book => categoryFilter.includes(book.categoryName) && book.rating > selectedRating))
      }
    }
  }, [categoryFilter, data])
  
  const handleCategoryFilter = (e) => {
    const { value, checked } = e.target
    // console.log(checked)
    
    if (checked) {
      setCategoryFilter((prevCategories) => [...prevCategories, value])
      
    } else {
      setCategoryFilter((prevCategories) => prevCategories.filter((category) => category !== value))
      setCategories(categories => categories.map(category => {
        if (category.name === value)
        {
          category.checked = checked
          return category
        } else {
          return category
        }
      }))
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

export default Books