import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Header from './components/header/Header'
import HomePage from './components/home/HomePage'
import AboutPage from './components/about/AboutPage'
import ReservationPage from './components/reservation/ReservationPage'
import MenuPage from './components/menu/MenuPage'
import ContactPage from './components/contact/ContactPage'
import Pages from './components/pages/Pages'
import CartContent from './components/cart/CartContent'
import BlogPage from './components/blog/BlogPage'
import ProductDetailsPage from './components/cart/ProductDetailsPage'

import Footer from './components/footer/Footer'



/* scrolls to the top whenever the page changes */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/cart" element={<CartContent />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </Provider>
  )
}