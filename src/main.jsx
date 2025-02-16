import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"; 
import './index.css'
import App from './App.jsx'
import Main from './Pages/Main.jsx';
import Header from './Components/Header.jsx';
import Upload from './Pages/Upload.jsx';
import Summaries from './Pages/Summaries.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/summaries" element={<Summaries />} />
    </Routes>
  </BrowserRouter>
)
