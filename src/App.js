// App.js
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { Routes, Route } from "react-router-dom";
import {  NoteState } from './context/notes/NoteState'; // Correct import

function App() {
  return (
    <NoteState> {/* Use NoteState component */}
      <>
        <Navbar />
        
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </>
    </NoteState>
  );
}

export default App;
