import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from './App'
import BookView from './features/books/BookView'
import BookDetails from './features/books/BookDetails'

// routes and elements for the router
const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>
	},
	{
		path: "/books/:bookCategory",
		element: <BookView/>
	},
	{
		path: "/books/:bookCategory/:bookId",
		element: <BookDetails/>
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
)