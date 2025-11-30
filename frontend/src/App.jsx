import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Testinomial from './pages/Testinomial'
import ContactUs from './pages/ContactUs'
import Footer from './components/footer/Footer'
import BookService from './pages/BookService'
import FindGarages from './pages/FindGarages'

const App = () => {

  const url = "http://localhost:4000";
  return (
    <div>
      <Navbar />
      
      
      {/* Sections one after another */}
      <section id="home">
        <Home url={url} />
        
      </section>

      <FindGarages />
      
      <section id="bookService">
        <BookService />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="testinomial">
        <Testinomial />
      </section>

      <section id="contact">
        <ContactUs />
      </section>

      <Footer />
    </div>
  )
}

export default App
