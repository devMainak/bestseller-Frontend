import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './app/store'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from './App'
import BookView from './features/books/BookView'
import BookDetails from './features/books/BookDetails'
import Wishlist from './features/wishlist/Wishlist'
import CartView from './features/cart/CartView'
import UserDetails from './features/address/UserDetails'
import AddressForm from './features/address/AddressForm'

// routes and elements for the router
const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>
	},
	{
		path: "/books/:bookCategory?",
		element: <BookView/>
	},
	{
		path: "/books/:bookCategory/:bookId",
		element: <BookDetails/>
	},
	{
		path: "/wishlist",
		element: <Wishlist/>
	},
	{
		path: "/cart",
		element: <CartView/>
	},
	{
		path: "/user",
		element: <UserDetails/>
	},
	{
		path: "/user/address",
		element: <AddressForm/>
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router}/>
			</PersistGate>
		</Provider>
	</React.StrictMode>
)