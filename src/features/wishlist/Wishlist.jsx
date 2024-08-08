import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist } from './wishlistSlice'
import Header from "../../components/Header"
import { Link } from 'react-router-dom'
import { fetchBooks } from '../books/booksSlice'

const Wishlist = () => {
  // configuring useDispatch for usage
  const dispatch = useDispatch()

  // Fetching wishlist on page load
  useEffect(() => {
    dispatch(fetchWishlist())
    dispatch(fetchBooks())
  }, [])

  // Destructuring the wishlistSlice
  const { wishlist, status, error } = useSelector(state => state.wishlist)
  // Destructuring the books
  const { books } = useSelector(state => state.books)
  
  return (
    <>
      <Header/>
      <main className="container">
        <h4 className="display-3 fw-semibold text-center">Your Wishlist <span className='text-danger'>({wishlist.length > 0 ? wishlist.length : 0})</span></h4>
        <section>
          {status === "loading" && <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}
          {error && <p className='fs-4 text-center-danger'>{error}</p>}
          {wishlist.length > 0 && 
            <ul className='list-group'>
              {wishlist.map(book => {
                const matchingBook = books.find(currBook => currBook.title === book.title);  
                const bookId = matchingBook ? matchingBook._id : null
              
              return ( 
              <li className='list-group-item d-flex justify-content-between' style={{height: "3in"}} key={book._id}>
                  <div className='d-flex'>
                    <div>
                      <Link to={`/books/${book.categoryName}/${bookId}`} state={books}>
                      <img src={book.coverImageUrl} className='img-fluid' style={{height: "100%"}}/>
                        </Link>
                      </div>
                    <div className='mx-4'>
                      <p className='fs-4 fw-normal'>{book.title}</p>
                      <p>by {book.author}</p>
                      <p className="card-text btn btn-danger">
                        ⭐ {book.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>   
                  <div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-danger" type="button">
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-light text-danger bg-danger-subtle"
                        type="button"
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
      
              </li>
                )
          })}
            </ul>
          }
        </section>
      </main>
    </>
  )
}

export default Wishlist