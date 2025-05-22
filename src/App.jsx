import { Route, Routes } from "react-router-dom";

import AboutUs from "./Pages/AboutUsPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/SignUpPage";

export default function App(){
  return(
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="/about" element={<AboutUs/>}/>
    </Routes>
    
  
  )
}