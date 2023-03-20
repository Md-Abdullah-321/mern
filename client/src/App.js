import React, { createContext , useReducer} from 'react';
import { Route , Routes} from 'react-router-dom';
import "./App.css"
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import ErrorPage from './components/Errorpage';

import {initialState, reducer} from './reducer/useReducer' 

  // 1: Context API:  
  export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <>

    <userContext.Provider value={{state, dispatch}}>
      <Navbar/>
  {/* Routing Path in React  */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />

          {/* If not match, show error  */}
          <Route path='*' element={<ErrorPage />} />
      </Routes>
      </userContext.Provider>
    </>
  )
}

export default App;