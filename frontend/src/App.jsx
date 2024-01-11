import { useState,useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Appbar from './Appbar.jsx';
import AddCourses from './AddCourses.jsx';
import Courses from './Courses.jsx';
import Course from './Course.jsx';


function App() {



  return (
    <>
   <div style={{width:"100vw",height:"100vh",backgroundColor:"#eeeeee" } }>

           
            
            <Router>
            <Appbar/>
                <Routes>
                    <Route path="/courses" element ={<Courses/>}/>
                    <Route path="/course/:courseId" element={<Course/>}/>
                    <Route path="/login" element ={<Signin/>}/>
                    <Route path ="/signUp"element = {<Signup/>}/>
                    <Route path="/addCourse" element={<AddCourses/>}/>
                    
                  
                </Routes>

            </Router>
      </div>
      
    </>
  ) 
}

export default App;
