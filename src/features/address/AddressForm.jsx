import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { addNewAddressAsync, updateAddressAsync, deleteAddressAsync } from './adressSlice'
import Header from "../../components/Header"

const AddressForm = () => {
  // Configuring useLocation for usage
  const dispatch = useDispatch()
  // Configuring useLocation for usage
  const location = useLocation()
  // Extracting address if available
  const { address } = location.state || {}
  // State bindings with values depending on predefined address
  const [houseNumber, setHouseNumber] = useState(address ? address.houseNumber : '')
  const [street, setStreet] = useState(address ? address.street : '')
  const [city, setCity] = useState(address ? address.city : '')
  const [state, setState] = useState(address ? address.state : '')
  const [country, setCountry] = useState(address ? address.country : '')
  const [postalCode, setPostalCode] = useState(address ? address.postalCode : '')
  const [alert, setAlert] = useState('')

  const addressFormHandler = async (e) => {
    e.preventDefault()
    try {
      if (houseNumber && street && city && state && country && postalCode) {
        if (!address) {
          const newAdderss = {houseNumber, street, city, state, country, postalCode: parseInt(postalCode)}
          const resultAction = await dispatch(addNewAddressAsync(newAdderss))
          if (addNewAddressAsync.fulfilled.match(resultAction))
          {
            setAlert("New address added!")
            setTimeout(() => {
              setAlert('')
            }, 2000)
          }
        } else {
          const updatedAdderss = {houseNumber, street, city, state, country, postalCode: parseInt(postalCode)}
          const resultAction = await dispatch(updateAddressAsync({addressId: address._id, address: updatedAdderss}))
          if (updateAddressAsync.fulfilled.match(resultAction))
          {
            setAlert("Address updated successfully!")
            setTimeout(() => {
              setAlert('')
            }, 2000)
          }
        }
      } else {
        setAlert("Fill out all the details!")
        setTimeout(() => {
          setAlert('')
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <>
      <Header/>
      <main className="container">
        <h3 className="display-3 fw-semibold py-4">Add New Address</h3>
          <form onSubmit={addressFormHandler}>
            <input onChange={(e) => setHouseNumber(e.target.value)} className="form-control mb-3" type="text" placeholder="House / Apartment No." value={houseNumber}/>
            <input onChange={(e) => setStreet(e.target.value)} className="form-control mb-3" type="text" placeholder="Street / Square / Block" value={street}/>
            <input onChange={(e) => setCity(e.target.value)} className="form-control mb-3" type="text" placeholder="City" value={city}/>
            <input onChange={(e) => setState(e.target.value)} className="form-control mb-3" type="text" placeholder="State" value={state}/>
            <input onChange={(e) => setCountry(e.target.value)} className="form-control mb-3" type="text" placeholder="Country" value={country}/>
            <input onChange={(e) => setPostalCode(e.target.value)} className="form-control mb-3" type="number" placeholder="Postal Code" value={postalCode}/>
            <button className="btn btn-danger" type='submit'>Add</button>
            <button className="btn btn btn-light text-danger bg-danger-subtle mx-3">Delete</button>
          </form>
          {alert && <p className='fs-4 py-4'>{alert}</p>}
      </main>
    </>
  )
}

export default AddressForm