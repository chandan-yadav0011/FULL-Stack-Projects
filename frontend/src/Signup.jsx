import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Card,Typography} from '@mui/material';
import { useState } from 'react';

function verify()
{
  console.log("logged in");
}



function Signup(prop)
{
    const[Email,setEmail]=useState("");
    const[Passwd,setPasswd]=useState("");
    

    return <div >
        <br/>
        <br/>
        <br/>
            <div style={{display:"flex",justifyContent:"center"}} >
            
              <Typography variant={"h5"} >Welcome to the club. Sign up below</Typography>
            </div>
            <br/>
            
            <div style={{display:"flex",justifyContent:"center"}} >
                  <Card variant={"outlined"} style={{width:400,
                                                padding:20, }}>
                                                 
                        <TextField fullWidth={true} onChange={(event)=>{
                            setEmail(event.target.value);
                            
                        }}  id="email" label="Email" variant="outlined" />
                  <br/>
                  <br/>
                        <TextField fullWidth={true} onChange={(event)=>{
                            setPasswd(event.target.value);
                        }}   id="passwd" label="Password" variant="outlined" />

                  <br/>

                    <br></br>

                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> <br/>

                    <Button variant="contained" onClick={()=>{
                        
                        fetch("http://localhost:3000/admin/signup",{
                          method:"POST",

                          body:JSON.stringify({
                            username:Email,
                            password:Passwd
                          }),
                          
                          headers:{
                            "Content-type":"application/json",
                          }
                        }).then((data)=>{
                         
                          data.json().then(val=>{

                            localStorage.setItem("token",val.token);
                            console.log(val);
                          })
                        });
                    }}>Sign Up</Button> <br/>
                    
                    

                  </Card>
            </div>
    </div>
}

export default Signup;