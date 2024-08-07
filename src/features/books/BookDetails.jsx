import { useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header'

const BookDetails = () => {
  const location = useLocation()
  const books = location.state
  const { bookId } = useParams()

  const book = books.find(book => book._id === bookId)
  
  return (
    <>
      <Header/>
      <main className='container'>
        <div className='d-flex justify-content-between pt-5'>
          <div>
            <img src={`${book.coverImageUrl}`} className='img-fluid' style={{maxHeight: "50vh", maxWidth: "40vw"}}/>
          </div>
          <div className='mx-4' style={{minxHeight: "50vh"}}>
            <h3 className='display-3 fw-semibold'>{book.title}</h3>
            <p className='fs-4 fw-normal'>by {book.author}, published in {book.publishedYear}</p>
            <p className="card-text btn btn-danger">
              ⭐ {book.rating.toFixed(1)}
            </p>
            <p className='fs-5 pt-4'>{book.summary}</p>
          </div>
          <div className='w-50'>
            <div className='card'>
              <div className='card-body'>
                <p className='fs-4'>🗺 <br/>{book.country}</p>
                <hr/>
                  <p className='fs-4'>友達 <br/>{book.language}</p>
                <hr/>
            <p className='card-text fs-4'>Price: <br/>₹ {book.price}/-</p>
                <p className='card-text fs-4'>Free Delivery</p>
                <div className="d-grid gap-2">
                  <button className="btn btn-danger" type="button">
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-light text-danger bg-danger-subtle"
                    type="button"
                  >
                    Add to Wishlist
                  </button>
                </div>
                </div>
              </div>
          </div>
          </div>
      </main>
    </>
  )
}

export default BookDetails