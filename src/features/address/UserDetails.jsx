import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAddresses, deleteAddressAsync } from "./adressSlice";
import {
  fetchOrderAsync,
  deleteOrderAsync,
} from "../orderhistory/orderHistorySlice";
import Header from "../../components/Header";
import { useEffect } from "react";

const UserDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchOrderAsync());
  }, []);
 
  const { addresses, status, error } = useSelector((state) => state.address);
  const { books } = useSelector((state) => state.books);
  const orderState = useSelector((state) => state.order);

  const handleDeleteAddress = async (addressId) => {
    dispatch(deleteAddressAsync(addressId));
  };

  const cancelOrderHandler = async () => {
    try {
      const orderId = orderState.order._id;
      const resultAction = await dispatch(deleteOrderAsync(orderId));
    } catch (error) {
      throw new Error(error);
    }
  };

  const formatedDate =
    orderState.order &&
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    }).format(
      new Date(orderState.order.updatedAt).setDate(
        new Date(orderState.order.updatedAt).getDate() + 4
      )
    );

  return (
    <>
      <Header />
      <main className="container">
        <div className="py-4">
          <h3 className="display-3 fw-semibold pb-3">User Details</h3>
          <div className="d-flex">
            <div>
              <img
                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                className="img-fluid"
                style={{ height: "150px", borderRadius: "50%" }}
              />
            </div>
            <div className="px-4">
              <p className="fs-4">John Doe</p>
              <p className="fs-4">Phone Number: +1-555‑0100</p>
              <p className="fs-4">Email: johndoe@testemail.com</p>
            </div>
          </div>
          <div className="py-4">
            <Link className="btn btn-danger" to={`/user/address`}>
              Add Address
            </Link>
          </div>
          <div>
            <h5 className="display-5 fw-semibold">Addresses</h5>
            {status === "loading" && (
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {/* {error && <p>{error}</p>} */}
            {addresses.length > 0 ? (
              <ul className="list-group w-50">
                {addresses.map((address) => (
                  <li className="list-group-item" key={address._id}>
                    {address.houseNumber}, {address.street}, {address.city},{" "}
                    {address.state}, {address.country} - {address.postalCode}
                    <span className="float-end">
                      <Link
                        style={{ textDecoration: "none", color: "red" }}
                        to="/user/address"
                        state={{ address }}
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <Link
                        style={{ textDecoration: "none", color: "red" }}
                        onClick={() => handleDeleteAddress(address._id)}
                      >
                        Delete
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No address found!</p>
            )}
          </div>
          <div>
            <div className="d-flex justify-content-between mt-4">
              <div className="display-5 fw-semibold">
                {" "}
                {orderState.order ? "Last Order" : "You have no orders"}
              </div>
              <div>
                {orderState.order && (
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => cancelOrderHandler()}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
            {orderState.status === "loading" && (
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {/* {orderState.error && <p>{error}</p>} */}
            {orderState.order && (
              <div>
                <p className="fs-5 fw-semibold">
                  Arriving on{" "}
                  <span className="text-danger">{formatedDate}</span>
                </p>
                <p className="fs-5 fw-semibold">
                  Order Amount:{" "}
                  <span className="text-danger">
                    ₹ {Math.ceil(orderState.order.totalAmount)}/-
                  </span>{" "}
                  ({" "}
                  <span>
                    <span className="text-danger">
                      {orderState.order.totalBookCount}
                    </span>{" "}
                    {orderState.order.totalBookCount == 1 ? "Book" : "Books"}
                  </span>{" "}
                  )
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-start">
                  {orderState.order.books.map((book) => {
                    return (
                      <div>
                        <div
                          className="card position-relative"
                          style={{ maxWidth: "200px", height: "400px" }}
                          key={book._id}
                        >
                          <Link
                            to={`/books/${book.categoryName}/${book._id}`}
                            state={books}
                          >
                            <img
                              src={book.coverImageUrl}
                              className="card-img-top img-fluid px-2 pt-2"
                              style={{ height: "300px" }}
                            />
                          </Link>
                          <div className="card-body">
                            <h5 className="card-title">
                              {book.title.split(" ").slice(0, 5).join(" ")}...
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDetails;
