import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist, deleteBookFromWishlistAsync } from './wishlistSlice'
import Header from "../../components/Header"
import { Link } from 'react-router-dom'
import { fetchBooks } from '../books/booksSlice'

const Wishlist = () => {
  // configuring useDispatch for usage
  const dispatch = useDispatch()

  // alert for iteractivity
  const [alert, setAlert] = useState('')
  
  // Fetching wishlist on page load
  useEffect(() => {
    dispatch(fetchWishlist())
    dispatch(fetchBooks())
  }, [])

  // Destructuring the wishlistSlice
  const { wishlist, status, error } = useSelector(state => state.wishlist)
  // Destructuring the books
  const { books } = useSelector(state => state.books)

  // Async function to delete book from wishlist on click of btn
  const handleDeleteFromWishlist = async (bookId) => {
    try {
      const resultAction = await dispatch(deleteBookFromWishlistAsync(bookId))
      if (deleteBookFromWishlistAsync.fulfilled.match(resultAction))
      {
         setAlert("Removed book from Wishlist.")
        setTimeout(() => {
          setAlert("")
        }, 2000)
      }
    } catch(error) {
      console.error(error)
    }
  }
  
  return (
    <>
      <Header/>
      <main className="container">
        <h4 className="display-3 fw-semibold text-center py-4">Your Wishlist <span className='text-danger'>({wishlist.length > 0 ? wishlist.length : 0})</span></h4>
        <section>
          {status === "loading" && <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}
          {error && <p className='fs-4 text-center-danger'>{error}</p>}
          {alert && (
            <div className="row">
              <div
                className="alert alert-success d-flex align-items-center"
                role="alert"
                style={{ height: "3rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                  style={{ height: "2rem" }}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <div>{alert}</div>
              </div>
            </div>
          )}
          {wishlist.length > 0 && 
            <ul className='list-group pb-5'>
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
                        Move to Cart
                      </button>
                      <button
                        className="btn btn-light text-danger bg-danger-subtle"
                        type="button" onClick={() => handleDeleteFromWishlist(book._id)}
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