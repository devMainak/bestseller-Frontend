import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAddresses, deleteAddressAsync} from './adressSlice'
import Header from '../../components/Header'
import { useEffect } from 'react'

const UserDetails = () => {
  // Configuring useDispatch for usage
  const dispatch = useDispatch()
  // fetching addresses on page load
  useEffect(() => {
    dispatch(fetchAddresses())
  }, [])
  // Destructuring address slice
  const { addresses, status, error } = useSelector(state => state.address)
  
  return (
    <>
      <Header/>
      <main className='container'>
        <div className='py-4'>
          <h3 className='display-3 fw-semibold pb-3'>User Details</h3>
          <div className='d-flex'>
            <div>
                  <img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' className='img-fluid' style={{height: "150px", borderRadius: "50%"}}/>     
            </div>
            <div className='px-4'>
              <p className='fs-4'>John Doe</p>
              <p className='fs-4'>Phone Number: +1-555‑0100</p>
              <p className='fs-4'>Email: johndoe@testemail.com</p>
            </div>
          </div>
          <div className='py-4'>
            <Link className='btn btn-danger' to={`/user/address`}>Add Address</Link>
          </div>
          <div>
            <h5 className='display-5 fw-semibold'>Addresses</h5>
            {status === "loading" && <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>}
            {error && <p>{error}</p>}
            {addresses.length > 0 && (
              <ul className='list-group w-50'>
                {addresses.map(address => (
                <li className='list-group-item'>
                  {address.houseNumber}, {address.street}, {address.city}, {address.state}, {address.country} - {address.postalCode} 
                  <span className='float-end'>
                    <Link style={{textDecoration: "none", color: "red"}} to="/user/address" state={address}>Edit</Link>  |  <Link style={{textDecoration: "none", color: "red"}}>Delete</Link>
                  </span>
                </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default UserDetails