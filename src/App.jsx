import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./component/RequireAuth";
import { instance } from "./Helpers/axiosinstance";
import AboutUs from "./Pages/AboutUsPage";
import AccessDeniedPage from "./Pages/AccessDenied";
import Contact from "./Pages/ContactPage";
import CourseDetailPage from "./Pages/course/CourseDetailPage";
import CoursesPage from "./Pages/course/CoursesPage";
import HomePage from "./Pages/HomePage";
import LecturesPage from "./Pages/lectures/LecturesPage";
import Login from "./Pages/LoginPage";
import NotFountPage from "./Pages/notFount";
import FailPage from "./Pages/payment/FailPage";
import SubscriptionCheckout from "./Pages/payment/Subscription";
import SuccessPage from "./Pages/payment/SuccessPage";
import SignUp from "./Pages/SignUpPage";
import EditProfile from "./Pages/user/EditProfile";
import Profilepage from "./Pages/user/profile";
import {  tokenVerify } from "./redux/slices/authSlice";

export default function App(){

  const dispatch = useDispatch()
  const { isLogin } = useSelector(state => state.auth)



  useEffect(()=>{
      isLogin && dispatch(tokenVerify())
  },[])

  return(
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth myRoles={["admin","user"]}/>}>
        <Route path="/user/profile" element={<Profilepage />} />
        <Route path="/user/editprofile/:id" element={<EditProfile />} />
        <Route path="/course/lectures/" element={<LecturesPage />} />
      </Route>

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course/details" element={<CourseDetailPage />} />


      <Route path="/course/payment/subscribe" element={<SubscriptionCheckout />} />
      <Route path="/course/payment/success" element={<SuccessPage />} />
      <Route path="/course/payment/fail" element={<FailPage />} />

      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/contact" element={<Contact/>}/>
    
      <Route path="/access_denied" element={<AccessDeniedPage />} />
      <Route path="/*" element={<NotFountPage/>} />

    </Routes>
    
  
  )
}