import React from 'react'
import Navbar from './layout/Navbar'
import { Route, Routes } from 'react-router-dom'
import Category from './pages/Category'
import { Home } from './pages/Home'
import Paper from './pages/paper'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PaperDashboard from './pages/PaperDashboard'
import CourseDashboard from './pages/CourseDashboard'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/category' element={<Category/>}></Route>
      <Route path='/paper' element={<Paper/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/paper-dashboard' element={<PaperDashboard/>}></Route>
      <Route path='/course-dashboard' element={<CourseDashboard/>}></Route>
    </Routes>
</>
  )
}

export default App