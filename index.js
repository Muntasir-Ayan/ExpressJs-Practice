const express = require('express')
const app = express();
const Joi = require('joi');

// middleware
app.use(express.json());


const courses = [
    {   id:1,
        name: 'course 1'
    
    },
    {   id:2,
        name: 'course 2'
    
    },
    {   id:3,
        name: 'course 3'
    
    }
]

// get method

app.get('/',(req,res)=>{
    res.send('hello world !!!');
});

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given id is not found");
    res.send(course);
});


// post method
app.post('/api/courses',(req,res)=>{

    const schema ={
        name: Joi.string().min(3).required();
    };
    

    if(!req.body.name || req.body.name.length <3){
        res.status(400).send('Name is required and should be minimum 3 character');
        return;
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    course.push(course);
    res.send(course);
});





// PORT Dynamically
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listen on ${port}...`);
});