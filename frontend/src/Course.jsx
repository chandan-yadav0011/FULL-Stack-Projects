import { Button, ButtonBase, Card, TextField, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function Course()
{
    const {courseId} =useParams();
    const[course,setCourseId] = useState();
    const[title, setTitle]=useState();
    const[price, setPrice]=useState();
    const[purchased, setPurchased]=useState();

    useEffect(()=>{


        
        fetch("http://localhost:3000/admin/courses",{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("token"),
            }
        }).then((data)=>{
            data.json().then((resp)=>{
                
               var b= Number(localStorage.getItem("coursekey"));
                
                var element = resp.find(a=>a.courseId===b);
                
                setCourseId(element);


            })
        })
        
    },[]);

    console.log(course);
    if(!course)
    {
        return <div>
            Loading...
        </div>
    }
    return (
        <div >
            <div>
                 
                    <Card variant="outlined"  style={{marginLeft:20, width:200, minHeight:200, textAlign:"center"}}>
          
                        <Typography variant="h4">{course.title}</Typography> 
                        <Typography variant="h6">{course.price}</Typography>
                        
                    </Card>
                    
            </div>
            
            <div style={{display:"flex" ,justifyContent:"center"}}>

            
            <Card variant="outlined"  style={{width:500, height:300,padding:20}}>

                <Typography variant={"h5"} textAlign={"center"}>Edit Course</Typography>
                <br/>
                

                <TextField fullWidth variant ={"outlined"} id="title" label="change title"   onChange={(event)=>{
                        setTitle(event.target.title);
                }}></TextField>
                <br/>
                <br/>
                <TextField fullWidth variant ={"outlined"} id="price" label="change price" onChange={(event)=>{
                    setPrice(event.target.price);
                }}></TextField>
                <br/>
            
                <br/>
                <TextField fullWidth variant ={"outlined"} id= "published" label="publish"  style={{}}></TextField>
                
                <Button variant="contained" onClick={()=>{
                    alert("Updated!");

                    fetch("http://localhost:3000/admin/courses/"+courseId,{
                        method:"PUT",
                        
                        body:{
                            title:title,
                            price:price,
                            published:true,
                        },
                        headers:{
                            "Content-type":"application/json",
                            "Authorization":"Bearer "+ localStorage.getItem("token"),
                        }
                    }).then((data)=>{
                        data.json().then(val=>{
                            console.log(val);
                        })
                    })
                }}>Update</Button>
            </Card>
            </div>
            <br/>
            <br/>
            <br/>

            <div style={{display:"flex" ,justifyContent:"center"}}>
            <ButtonBase style={{display:"flex" ,justifyContent:"center"}} >
                
                        <Card variant ="outlined" style={{display:"flex", width:200, minHeight:200,justifyContent: "center"}}>
                            <Typography variant={"h5"}>Lectures</Typography>
                        </Card>
                
            
            </ButtonBase>
            </div>

            
        </div>

    )
}

export default Course;