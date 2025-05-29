import { Route, Routes } from "react-router-dom";

import RequireAuth from "./component/RequireAuth";
import AboutUs from "./Pages/AboutUsPage";
import AccessDenidePage from "./Pages/AccessDenied";
import Contact from "./Pages/ContactPage";
import CourseDetailPage from "./Pages/course/CourseDetailPage";
import CoursesPage from "./Pages/course/CoursesPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import NotFountPage from "./Pages/notFount";
import SignUp from "./Pages/SignUpPage";
import EditProfile from "./Pages/user/EditProfile";
import Profilepage from "./Pages/user/profile";

export default function App(){
  return(
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth myRoles={["admin","user"]}/>}>
        <Route path="/user/profile" element={<Profilepage />} />
        <Route path="/user/editprofile/:id" element={<EditProfile />} />
      </Route>

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course/details" element={<CourseDetailPage />} />

      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/contact" element={<Contact/>}/>
    
      <Route path="/access_denied" element={<AccessDeniedPage />} />
      <Route path="/*" element={<NotFountPage/>} />

    </Routes>
    
  
  )
}