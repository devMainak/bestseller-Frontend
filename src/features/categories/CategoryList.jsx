import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CategoryList = ({categories}) => {
  // Destructuring categories slice from global state 
  const { status, error } = useSelector(state => state.categories)
  
  return (
    <div>
      <section className='bg-danger-subtle'>
        <div className='container'>
        <h3 className='display-3 fw-semibold'>Categories</h3>
          {status === "loading" && <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>}
          {error && <p className='fs-4 fw-normal'>{error}</p>}
          { categories.length > 0 && 
            <div className='row pt-2'>
              {categories.map(category => {
                return (
                  <div className='col-sm-4 py-2'>
                    <Link to={`/books/${category.category}`}>
                      <div className='card d-flex justify-content-center'>
                       <img className='card-img img-fluid' src={category.coverImage} alt={`${category.category} Books`} style={{height: "15rem"}}/>
                      </div>
                    </Link>
                    <p className='fs-4 fw-semibold'>{category.category}</p>
                  </div>
                )
              })
            }
            </div>
          }
          </div>
      </section>
    </div>
  )
}

export default CategoryList