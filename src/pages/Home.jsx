import { Link } from 'react-router-dom'
import CategoryList from '../features/categories/CategoryList'

const Home = () => {

  return (
    <div>
       <section className="pt-4 pb-4">
         <div className='container'>
         <div className="card d-flex justify-content-center">
           <img className="card-img img-fluid" src="/public/books-hero.jpg" alt="Books"/>
           <div className="card-img-overlay text-light align-self-center">
            <h1 className='text-center display-1 fw-semibold'>Explore Books</h1>
           </div>
         </div>
           </div>
           </section>
          <CategoryList/>
    </div>
  )
}

export default Home

