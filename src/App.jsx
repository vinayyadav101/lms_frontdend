import { Route, Routes } from "react-router-dom";

import RequireAuth from "./component/RequireAuth";
import AboutUs from "./Pages/AboutUsPage";
import Contact from "./Pages/ContactPage";
import CoursesPage from "./Pages/course/CoursesPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import NotFountPage from "./Pages/notFount";
import SignUp from "./Pages/SignUpPage";
import Profilepage from "./Pages/user/profile";

export default function App(){
  return(
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth myRoles={["admin"]}/>}>
        <Route path="/profile" element={<Profilepage />} />
      </Route>

      <Route path="/courses" element={<CoursesPage />} />

      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/contact" element={<Contact/>}/>
    
      <Route path="/*" element={<NotFountPage/>} />
    </Routes>
    
  
  )
}