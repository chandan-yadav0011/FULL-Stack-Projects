import { Button, Card, TextField, Typography } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";

function AddCourses()
{
    const[title,setTitle]= useState("")
    const[price,setPrice]=useState("");
    const[purchased,setPurchased]=useState(true);
    
    return <div >
            <div    style={{display:"flex",justifyContent:"center"}} >
                <Typography variant={"h5"}>Add Courses</Typography>

            </div>
            <br/>
        
            <div style={{display:"flex",justifyContent:"center"}}>

                <Card variant= {"outlined"} style={{width:400,padding:20}} >
                    <div   >

                        <div >
                        <TextField fullWidth={true} label={"Course Title"} onChange={(event)=>{
                            setTitle(event.target.value);
                        }}/>

                        <br/>
                        <br/>

                        <TextField fullWidth={true} label={"Price"} onChange={(event)=>{
                            setPrice(event.target.value);
                        }}/>

                        <br/>
                        </div>
                        <br/>

                        <div>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Publish" onChange={(event)=>{ 
                            setPurchased(event.target.checked);
                        }} />
                        </div>
                        <br/>
                        <div>

                        <Button variant={"contained"} style={{display:"flex", justifyContent:"flex-end"}} onClick={()=>{
                            alert("Course Added!")
                            fetch("http://localhost:3000/admin/courses",{

                                method:"POST",

                                body:JSON.stringify({
                                    title:title,
                                    price:price,
                                    purchased:purchased,
                                }),
                                headers:{
                                    "Content-type":"application/json",
                                    "Authorization":"Bearer " + localStorage.getItem("token"),
                                }
                            }).then((data)=>{
                                
                                data.json().then((val)=>{
                                    console.log(val);
                                    
                                })
                            })
                        }}>Add</Button>
                        <br/>
                        
                        
                        <Button  variant ="contained" onClick={()=>{

                            window.location="/courses";
                        }}>All Courses</Button>
                        </div>
                    </div>
                    
                    
                    
                </Card>
            </div>

    </div>
}
export default AddCourses;