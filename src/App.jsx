import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header/>
      <main>
        <Home/>
      </main>
      <Footer/>
    </>
  )
}
