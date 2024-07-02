import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from './App'
import Books from './pages/Books'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>
	},
	{
		path: "/books/:bookCategory",
		element: <Books/>
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
)