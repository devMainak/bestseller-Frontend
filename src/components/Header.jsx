import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-danger-subtle">
      <div className="container container-fluid d-flex justify-content-between">
        <div>
          <a className="navbar-brand text-danger fs-4 fw-semibold" href="#">
            bestseller
          </a>
        </div>
        <div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div>
          <Link className="btn btn-danger" to="/">
            Login
          </Link>
          <Link>
            <img src='../public/wishlist.svg' alt='Cart' className='img-fluid px-3' style={{height: '26px'}}/>
          </Link>
          <Link>
            <img src='../public/red-cart.svg' alt='Cart' className='img-fluid px-2' style={{height: '26px'}}/>
            
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
