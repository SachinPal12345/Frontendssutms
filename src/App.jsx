import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './component/studentComponents/Signup';
import Signin from './component/studentComponents/Signin';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Course from './component/studentComponents/Course';
import Login from "./component/hodComponents/Login"
import RegisterDetailed from './component/RegistrationDetailed';
import Register from './component/hodComponents/Register';
import Dashboard from "./component/Dashboard";
import Header from './component/Header';
import Erp from './component/Erp';
import NewRegistrationRequests from './component/hodComponents/NewRegistrationRequests';
import Enrollment from './component/Enrollment';


import ButtonFun from './component/ButtonFun';


import Registration from './component/Registration';
import Waiting from './component/studentComponents/Waiting'

function App() {
   const user = JSON.parse(localStorage.getItem("currentUser"));
  function isAuthenticated() {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData) {
      return true
    }

    return false;
  }

  function PrivateRoute({ element, ...rest }) {
    const location = useLocation();
    if (isAuthenticated()) {
      return element;
    } else {
      return <Navigate to={`/studentlogin?redirect=${location.pathname}`} />;
    }
  }
  return (
    <>
      <Routes>

        <Route path='/erp' element={<Erp />} />
        <Route path='/' element={<Header />} />
        <Route path='/Registration' element={<Registration/>}/>
      
        
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<NewRegistrationRequests />} />
        <Route path='/adminregister' element={<Register />} />
        <Route path="/studentregister" element={<Signup />} />
        <Route path="/studentlogin" element={<Signin />} />


        <Route path='/enrollement' element={<PrivateRoute element={<ButtonFun />}/> } />
        {/* <Route path='/personal' element={user? <PersonalInfo />:<Signin/> } />
        <Route path='/photo' element={<Photo />} /> */}
        <Route path='/waiting' element={<Waiting />} />

        <Route
          path="/selectCourse"
          element={<PrivateRoute element={<Course />} />}
        />
      </Routes>
    </>
  )
}

export default App
