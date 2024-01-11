const express = require('express');
const jwt= require("jsonwebtoken");
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cors = require('cors');

const app= express();
app.use(cors())
const port= 3000;

app.use(bodyParser.json());

app.use(express.json()); // why???

let ADMINS=[];
let USER=[];
let COURSES=[];

const secretKey= "this_is_secret_key";

const getJwt=(user)=>{
    var payload = {username: user.username}; // just payloading only username and not entire user.
    return jwt.sign(payload,secretKey,{expiresIn: '1h'});  
}

function authenticateJwt(req,res,next)            // can also be written as const authenticateJwt = (req,res,next)=>
{
    const authorization = req.headers.authorization

    if(authorization)
    {
        const token = authorization.split(' ')[1];
        
        jwt.verify(token,secretKey,(err,user)=>{
            if(err)
            {
                 return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
        
    }
    else{
        res.status(401).json({"message":"Admin authorization failed"});
    }
   
    /*
    const user= USER.find(a=>a.username===username && a.password===password);
   // console.log(chkuser);
    if(user)
    {   
        req.user = user;     // here simply we have added the user (object of USER ) into the request like username and password req in headers means one can extract user obj from the req from here one..... 
       // req.random1 = "random";
       // res.json({message:"User found"});
        next();
    }
    else{
        res.status(409).json({message:"User not found"});

    }*/

}

function adminAuthentication(req,res,next)
{
    //const username = req.headers.username;
    //const password = req.headers.password;

    const {username,password} = req.headers;

    const checkAdmin= ADMINS.find(a=>a.username===username && a.password===password );
   

    if(checkAdmin)
    {
        next();
    }
    else{
        res.status(403).json({message:"Admin Authentication failed!"});
    }

   
};

app.get("/admin/me",authenticateJwt,(req,res)=>{

    res.send({
            username: req.user.username,
    });

    
} );

app.post("/admin/signup",(req,res)=>{

    
   // var bodySignUp= req.body.bodySignUp;
   var admin = {

    username : req.body.username,
    password: req.body.password,
    }


    var existingUser = ADMINS.find(a=>a.username === admin.username);
    
    if(existingUser)
    {
        res.status(403).json({message: "user already exists"});

    }
    else{
        
        var token = getJwt(admin);
        
        ADMINS.push(admin);
        res.status(201).json({message : "User created successfully",token});
        
    }
   
});

app.post("/admin/login",(req,res)=>{
    
    const{username,password}= req.headers;
    
    var user = ADMINS.find(a=>a.username===username && a.password===password);
    
    if(user)
    {
            var token = getJwt(user);
            res.status(203).json({
            message:"Logged in Successfully!",token});

    }
    else{
        res.status(203).json({
            message:"Admin Authorization failed!"});
    }

 
    
});

app.post("/admin/courses",authenticateJwt,(req,res)=>{
    
    var courses = {
        courseId : Date.now(),
        title: req.body.title,
        price: req.body.price,
        published: req.body.published   

    };
   
    var existingCourse = COURSES.find(a=>a.title===courses.title);
    //console.log(existingCourse.title);
    if(existingCourse)
    {
        res.status(214).json({"message":"Course already exists"});

    }
    else{
       
            COURSES.push(courses);
            res.status(202).json({"message": "Course created successfully!",
                       "courseId": courses.courseId })
        
        
    }
   

    
});

app.put("/admin/courses/:courseId",authenticateJwt,(req,res)=>{

    var courseIds = Number(req.params.courseId);
    
    var courses= COURSES.find(a=>a.courseId === courseIds);
    
    if(courses)
    {
        Object.assign(courses,req.body);

        res.status(212).json({message:"course updated successfully"});

    }   

    else{
        res.status(405).json({message:"course doesn't exists"});
    }   

});

app.get("/admin/courses",(req,res)=>{
    
    
    res.status(203).json(COURSES);
});


app.post("/users/signUp",(req,res)=>{
    //var user = req.body;  // body here contains userid and password and purchased =[];

    
    /*var user ={                          /// this is also one way to extract user details from the request
        username : req.body.username,
        password : req.body.password,
        purchased :[] 
    }*/

    // another way is 

    var user  = {...req.body,purchased: []};

    var userCheck = USER.find(a=>a.username=== user.username);
    
    if(userCheck)
    {
        res.status(406).json({message:"User already exists!"});

    }

    else{
        USER.push(user);
        //purchased.push(user.coursePurchased);
        var token = getJwt(user);
        res.status(207).json({message :"User created successfully",token});


    }



});

app.post("/users/login",(req,res)=>{
    //console.log(req.random);
    const {username,password}= req.headers;

    const user = USER.find(u=>u.username===username && u.password===password);

    if(user)
    {
        const token = getJwt(user);
        res.status(214).json({message: "User logged in successfully",token});
    }
    else{
        res.status(413).json({message:"User not found. Please signUp"});
    }

})

app.get("/users/courses",authenticateJwt,(req,res)=>{
    
    res.json({courses:COURSES.filter(a=>a.published)});

    //another way is :

    /*var filteredCourses= [];

    for(var i=0; i<COURSES.length; i++)
    {
        if(COURSES[i].published)
        {
            filteredCourses.push(COURSES[i]);
        }
    }

    res.json({courses: filteredCourses});
    */
});

app.post("/users/courses/:courseId",authenticateJwt,(req,res)=>{
        const courseId= Number(req.params.courseId);
        const course = COURSES.find(c=>c.courseId ===courseId && c.published);

        if(course)
        {
           // var username = req.headers.username; // note this req also contains user object as req as we got this req from middleware.
            //USERS /**************/ one way is that we got username of the user from the req and we have USER .
            // so search in the USER the user object with username we have and then access its purchasedCourse array and
            // push the course id which he purchased...

            //*********** another way is done below */


            var user= USER.find(u=> u.username=== req.user.username);    //req.user.purchased.push(courseId); 

            user.purchased.push(course);

            res.json({message: "course purchased successfully"});

        }
        else{

            res.json({message: "course not found or published!"});
        }
});

app.get("/users/purchasedCourses",authenticateJwt,(req,res)=>{
    
    //const courses = COURSES.filter(c=>req.user.purchasedCourses===c.published)
   // res.json({purchasedCourses: req.user.purchasedCourses }); // note this will just print the ids of the courses purchased 
                                                                //but we want the complete object... 
                                                            // so we need to fetch the couses objects from the 
                                                            //COURSES whose ids are present in req.user.purchasedCourses

    var purchases =[];

                                                            //var purchasesId = req.user.purchased;
    var user = USER.find(u=>u.username===req.user.username);
    var purchasesId = user.purchased;
    res.json({purchasesId});
    for(let i=0; i<COURSES.length; i++)
    {
        if(purchasesId.indexOf(COURSES[i].courseId)!==-1)
        {
            purchases.push(COURSES[i]);
        }
    }

    res.json({purchases});

    //const courses = COURSES.filter(c=> req.user.purchasedCourses.includes(c.courseId)); // this also does the same thing what is done above

})

app.listen(port,()=>{
    console.log("listening here on port: 3000");
})