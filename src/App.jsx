import { Route, Routes } from "react-router-dom";

import AboutUs from "./Pages/AboutUsPage";
import HomePage from "./Pages/HomePage";
import SingUp from "./Pages/SingUpPage";

export default function App(){
  return(
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/singup" element={<SingUp />} />

      <Route path="/about" element={<AboutUs/>}/>
    </Routes>
    
  
  )
}