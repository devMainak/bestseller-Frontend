import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
// Import images if they are in the src directory
import wishlistIcon from '../../public/wishlist.svg';  
// Adjust the path as needed
import cartIcon from '../../public/red-cart.svg';      
// Adjust the path as needed

const Header = () => {

  const { wishlist } = useSelector(state => state.wishlist)
  
  return (
    <nav className="navbar navbar-expand-lg bg-danger-subtle sticky-top">
      <div className="container container-fluid d-flex justify-content-between">
        <div>
          <Link className="navbar-brand text-danger fs-4 fw-semibold" to="/">
            bestseller
          </Link>
        </div>
        <div>
          <form className="d-flex" role="search">
            <div className='input-group'>
              <span className='input-group-text bg-light'>🔍</span>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for books"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
        <div>
          <Link className="btn btn-danger" to="/login">
            Login
          </Link>
          <Link to="/wishlist">
            <img src={wishlistIcon} alt='Wishlist' className='img-fluid px-3' style={{ height: '26px' }} />      
          </Link>
          <Link to="/cart">
            <img src={cartIcon} alt='Cart' className='img-fluid px-2' style={{ height: '26px' }} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
