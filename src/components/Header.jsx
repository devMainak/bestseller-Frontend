import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import wishlistIcon from "../../public/wishlist.svg";
import cartIcon from "../../public/red-cart.svg";
import { fetchCart } from "../features/cart/cartSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, []);

  // Assuming these values come from your Redux store
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleSearchRequests = (e) => {
    e.preventDefault();
    if (query.length > 2) {
      setSearchParams({ query });
      navigate(`/books/search?query=${query}`);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };


  // Calculating total cart products according to qty of each product
  const totalCartProducts = cart.reduce((acc, curr) => acc += curr.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-danger-subtle fixed-top">
      <div className="container container-fluid d-flex justify-content-between">
        <Link className="navbar-brand text-danger fs-4 fw-semibold" to="/">
          bestseller
        </Link>
        <form className="d-flex" role="search" onSubmit={handleSearchRequests}>
          <div className="input-group">
            <span className="input-group-text bg-light">🔍</span>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for books"
              aria-label="Search"
              onChange={handleInputChange}
              value={query}
            />
          </div>
        </form>
        <div className="d-flex align-items-center">
          {/* <Link className="btn btn-sm btn-danger mx-2" to="#">
            Login
          </Link> */}
          <div className="icon-container position-relative mx-2">
            <Link to="/wishlist">
            <i class="fa-solid fa-heart fs-4 text-danger"></i>
            {wishlist.length > 0 && (
                <span className="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
          <div className="icon-container position-relative mx-3">
            <Link to="/cart">
            <i class="fa-solid fa-cart-shopping fs-4 text-danger"></i>
              {cart.length > 0 && (
                <span className="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                  {totalCartProducts}
                </span>
              )}
            </Link>
          </div>
          <Link to="/user">
            <img
              src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              alt="User"
              className="img-fluid px-2"
              style={{ height: "26px", borderRadius: "50%" }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
