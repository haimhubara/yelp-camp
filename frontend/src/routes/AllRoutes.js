import { Routes, Route } from "react-router-dom"
import { PageNotFound, HomePage, Campgrounds, CampGroundDetail, AddCampground, EditCampground, Register, Login } from "../pages"
import { ProtectedRoutes } from "./ProtectedRoutes"
export const AllRoutes = () => {

  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/campgrounds" element={<Campgrounds />} />
      <Route path="/campgrounds/new" element={<ProtectedRoutes> <AddCampground /></ProtectedRoutes>} />
      <Route path="/campgrounds/:id" element={<CampGroundDetail />} />
      <Route path="/campgrounds/:id/edit" element={<ProtectedRoutes> <EditCampground /></ProtectedRoutes>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}