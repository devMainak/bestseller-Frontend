import { useDispatch, useSelector } from 'react-redux'
import CategoryList from '../features/categories/CategoryList'
import { useEffect } from 'react'
import { fetchCategories } from '../features/categories/categoriesSlice'

const Home = () => {
  // configuring useDispatch for usage
  const dispatch = useDispatch()

  // Fetching categories for population
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const { categories } = useSelector(state => state.categories)
  
  return (
    <div>
       <section className="pt-4 pb-4">
         <div className='container'>
         <div className="card d-flex justify-content-center">
           <img className="card-img img-fluid" src="/books-hero.jpg" alt="Books"/>
           <div className="card-img-overlay text-light align-self-center">
            <h1 className='text-center display-1 fw-semibold'>Explore Books</h1>
           </div>
         </div>
           </div>
           </section>
          <CategoryList categories={categories} />
    </div>
  )
}

export default Home

