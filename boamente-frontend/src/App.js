import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header/Header'; 
import Home from './pages/Home/Home';
import Recursos from './pages/Resources/Resources'; 
import Contato from './pages/Contact/Contact'; 
import Login from './pages/Login/Login'; 
import Cadastro from './pages/Register/Register'; 
import Footer from './components/layout/Footer/Footer';

export default function App() {
  return (
    <Router>
      <div>
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
