import {Card,Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
//import {useHistory} from 'react-router-dom'



function Appbar()
{   
    const[admin, setAdmin]= useState(null);

    useEffect(()=>{

        fetch("http://localhost:3000/admin/me",{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("token"),
            }
        }).then((resp)=>{
            resp.json().then(val=>{
                
                if(val.username)
                {
                    setAdmin(val.username);
                }
                
            })
        })

    },[]);

    const navigate = useNavigate();
    
    if(admin!==null)
    {
        return <div style={{display:"flex",justifyContent:"space-between", padding:4}}>
                <div >
                    <Typography variant={"h6"}>Menu</Typography>
                </div>

                <div style={{display:"flex"}} >
                    <div style={{marginRight:10}}>
                        {admin}
                    </div>

                    <div>
                        <Button variant={"contained"} onClick={()=>{
                            //window.location="/login"
                            //history.push("/login"); 
                            localStorage.setItem("token",null);
                            window.location="/";
                          

                            
                        }}>Log out</Button>
                    </div>
                   
                   
                </div>
            
            
        
    </div>
    }
    else{
        return <div style={{display:"flex",justifyContent:"space-between", padding:4}}>
        <div >
            <Typography variant={"h6"}>Menu</Typography>
        </div>

        <div style={{display:"flex"}} >
            <div style={{marginRight:10}}>
                <Button variant={"contained"} onClick={()=>{
                  // just need to change the url and routers will take care of rendering the page
                  
                  //  here problem is of re rendering  so we used a hook "useHistory"
                    // window.location="/signUp"
                   //history.push("/signUp");
                   navigate("/signUp");
                   
                }}>Sign Up</Button> 
            </div>

            <div>
                <Button variant={"contained"} onClick={()=>{
                    //window.location="/login"
                    //history.push("/login"); 
                    
                    navigate("/login");

                    
                }}>Sign in</Button>
            </div>
           
           
        </div>
    
    

        </div>
    }
   
}

export default Appbar;