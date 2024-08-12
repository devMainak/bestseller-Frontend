import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart, updateBookInCartAsync, deleteBookFromCartAsync } from './cartSlice'
import Header from '../../components/Header'
import { fetchWishlist, addBookToWishlistAsync } from '../wishlist/wishlistSlice'
import { fetchBooks } from '../books/booksSlice'

const CartView = () => {
  // Configuring useDispatch for usage
  const dispatch = useDispatch()
  // alert for notification
  const [alert, setAlert] = useState('')
  // Fetching cart on page load
  useEffect(() => {
    dispatch(fetchCart())
    dispatch(fetchWishlist())
    dispatch(fetchBooks())
  }, [])
  
  // Extracting cart && wishlist && books from state for validation
  const { cart, status, error } = useSelector(state => state.cart)
  const { wishlist } = useSelector(state => state.wishlist)
  const { books } = useSelector(state => state.books)

  // Async function to add book to Wishlist from  cart
  const handleAddToWishlist = async (bookToAdd) => {
    if (wishlist.some(book => book.title === bookToAdd.title))
    {
      setAlert("Book is already in Wishlist.")
      setTimeout(() => {
        setAlert("")
      }, 2000)
    } else {
      try {
        const resultAction = await dispatch(addBookToWishlistAsync(bookToAdd))
        if (addBookToWishlistAsync.fulfilled.match(resultAction))
        {
          setAlert("Added to Wishlist")
          setTimeout(() => {
            setAlert("")
          }, 2000)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // Function to update the book quantity in cart
  const handleIncreaseBookQuantity = (book) => {
    try {
      const bookToUpdate = {...book, quantity: book.quantity + 1}
      dispatch(updateBookInCartAsync({bookId: bookToUpdate._id, book: bookToUpdate}))
    } catch (error) {
      console.error(error)
    }
  }

  // Async Function to decrease book quantity or remove book in cart
  const handleDecreaseBookQuantity = async (book) => {
    if (book.quantity > 1)
    {
      const bookToUpdate = {...book, quantity: book.quantity - 1}
      dispatch(updateBookInCartAsync({bookId: bookToUpdate._id, book: bookToUpdate}))
    } else {
      try {
        const resultAction = await dispatch(deleteBookFromCartAsync(book._id))
        if (deleteBookFromCartAsync.fulfilled.match(resultAction))
        {
          setAlert("Removed book from cart.")
          setTimeout(() => {
            setAlert("")
          }, 2000)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // Async function delete book from cart
  const handleRemoveFromCart = async (bookId) => {
    try {
      const resultAction = await dispatch(deleteBookFromCartAsync(bookId))
      if (deleteBookFromCartAsync.fulfilled.match(resultAction))
      {
        setAlert("Removed book from cart.")
        setTimeout(() => {
          setAlert("")
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  // Calculating total items in cart
  const totalItems = cart.reduce((acc, curr) => {
    acc = acc + curr.quantity 
    return acc
  }, 0)

  
  return (
    <>
      <Header/>
      <main className='container'>
        <h4 className="display-3 fw-semibold text-center py-4">Your Cart <span className='text-danger'>({cart.length > 0 ? totalItems : 0})</span></h4>
        {status === "loading" && <div className='text-center'><div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div>}
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
        { cart.length > 0 &&  <div className='row pb-5'>
          <div className='col-md-8'>
            <ul className='list-group'>
              {cart.map(book => {
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
                          <p className='fs-4'>₹ {book.price}/-</p>
                          <p className='fs-4'>Free Delivery</p>
                        </div>
                      </div>   
                      <div>
                        <div className='pb-5'>
                          <lable className='fs-4'>Quantity: </lable><br/>
                          <button style={{borderRadius: "30px"}} onClick={() => handleIncreaseBookQuantity(book)}>+</button>
                          <span className='fs-4 px-2'>{book.quantity}</span>
                          <button style={{borderRadius: "30px"}} onClick={() => handleDecreaseBookQuantity(book)}> - </button>
                        </div>
                        <div className="d-grid gap-2">
                          <button className="btn btn-danger" type="button" onClick={() => handleAddToWishlist(book)}>
                            Add to Wislist
                          </button>
                          <button
                            className="btn btn-light text-danger bg-danger-subtle"
                            type="button" onClick={() => handleRemoveFromCart(book._id)}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </div>

                  </li>
                    )
              })}
            </ul>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <p className='fs-4 fw-semibold'>PRICE DETAILS</p>
                <div className="d-grid gap-2">
                  <button className="btn btn-danger" type="button">Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </div> }
       
      </main>
    </>
  )
}

export default CartView