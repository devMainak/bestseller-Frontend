import { Link } from 'react-router-dom'
import useFetch from '../useFetch'

const Home = () => {

  const { data, loading, error } = useFetch('https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/categories')
  console.log(data)
  return (
    <div>
       <section className="pt-4 pb-4">
         <div className='container'>
         <div className="card d-flex justify-content-center">
           <img className="card-img img-fluid" src="/public/books-hero.jpg" alt="Books"/>
           <div className="card-img-overlay text-light align-self-center">
             <h1 className="text-center display-1 fw-semibold"><Link className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>Explore books ></Link></h1>
           </div>
         </div>
           </div>
           </section>
      <section className='bg-danger-subtle'>
        <div className='container'>
        <h3 className='display-3 fw-semibold'>Categories ></h3>
        <div className='row pt-2'>
          {data ? data.data.categories.map(category => {
            return (
              <div className='col-sm-4 py-2'>
                <Link to="/">
                  <div className='card d-flex justify-content-center'>
                   <img className='card-img img-fluid' src={category.coverImage} alt={`${category.category} Books`} style={{height: "15rem"}}/>
                  </div>
                </Link>
                <p className='fs-4 fw-semibold'>{category.category}</p>
              </div>
            )
          }) : loading && <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>}
        </div>
          </div>
      </section>
    </div>
  )
}

export default Home

