import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart } from './cartSlice'
import Header from '../../components/Header'
import { fetchWishlist } from '../wishlist/wishlistSlice'
import { fetchBooks } from '../books/booksSlice'

const CartView = () => {
  // Configuring useDispatch for usage
  const dispatch = useDispatch()
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
        { cart.length > 0 &&  <div className='row'>
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
                          <button style={{borderRadius: "30px"}}>+</button>
                          <span className='fs-4 px-2'>{book.quantity}</span>
                          <button style={{borderRadius: "30px"}}> -</button>
                        </div>
                        <div className="d-grid gap-2">
                          <button className="btn btn-danger" type="button">
                            Add to Wislist
                          </button>
                          <button
                            className="btn btn-light text-danger bg-danger-subtle"
                            type="button" onClick={() => handleDeleteFromWishlist(book._id)}
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