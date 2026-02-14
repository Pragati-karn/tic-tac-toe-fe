import { createContext, useState } from 'react'
import './App.css'
import { Home } from './Home'
import { Routes, Route } from "react-router-dom";
import Game from './Game';

export const payLoadContext = createContext();

function App() {
  const [payload, setPayload] = useState();
  const [winner, setWinner] = useState();
 return (
  <payLoadContext.Provider value = {{payload, setPayload, winner, setWinner}}>
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/getBoard" element={<Home/>} />
   </Routes>
  </payLoadContext.Provider>
 );
}

export default App
