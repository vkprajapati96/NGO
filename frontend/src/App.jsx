import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DonateForm from "./components/DonateForm";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<DonateForm />} />
      </Routes>
      <Footer/>
    </>
  );
}
