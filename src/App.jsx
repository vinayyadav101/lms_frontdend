import { Route, Routes } from "react-router-dom";

import Footer from "./component/fotor/Footer";

export default function App(){
  return(
    <>
    <Routes>
      <Route path="/*" element={<Footer/>}/>
    </Routes>
    </>
  )
}