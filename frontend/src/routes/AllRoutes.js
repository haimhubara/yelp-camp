import {Routes,Route} from "react-router-dom"
import { PageNotFound, HomePage, Campgrounds, CampGroundDetail, AddCampground } from "../pages"
export const AllRoutes = () => {

  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
   
        <Route path="/campgrounds" element={<Campgrounds/>}/> 
        <Route path="/campgrounds/new" element={<AddCampground/>}/> 
        <Route path="/campgrounds/:id" element={<CampGroundDetail/>}/> 
        <Route path="*" element={<PageNotFound/>}/> 
    </Routes>
    </>
  )
}