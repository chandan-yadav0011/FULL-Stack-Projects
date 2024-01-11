import { Card, Typography } from '@mui/material';
import {useState,useEffect, useLayoutEffect} from 'react';
import { ButtonBase } from '@mui/material';

function Courses()
{
    const[courses,allCourses]=useState([]);

    useEffect(()=>{

        fetch("http://localhost:3000/admin/courses",{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("token"),
            }

        }).then((data)=>{

            data.json().then((val)=>{
                allCourses(val);
                //console.log(val[1]);
                //console.log(courses);
            })

            //console.log(courses);
        })
    },[]);

    return (<div >
        
        <div style={{display:"flex",justifyContent:"center"}}>

            <Typography variant={"h5"}>COURSES</Typography>
            <br/>
           
        </div>

             
                
        <div  style={{display:"flex", flexWrap:"wrap", padding:20, justifyContent:"center", margin:20}}>
            {courses.map((data)=>{
                 return <div>
                 <Course  course={data}></Course>
                 </div>
            })}
          
        </div>
        
        

    </div>)
}

function Course(prop)
{
    return <div>
          <ButtonBase onClick={()=>{
                localStorage.setItem("coursekey",prop.course.courseId);
                window.location="/course/" + prop.course.courseId;
                
            }}>
       <Card variant="outlined"  style={{marginLeft:20, width:200, minHeight:200, textAlign:"center"}}>
          
        <Typography variant="h4">{prop.course.title}</Typography> 
        <Typography variant="h6">{prop.course.price}</Typography>
        
    </Card>
    </ButtonBase>
    </div>
        
    
}



export default Courses;