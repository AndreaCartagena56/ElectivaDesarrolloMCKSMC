const express = require('express');
const app= express ();
const path = require('path');
const port = 8080;
const router=require('./routes/routes')


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.json())
app.use('/',router)

app.listen(port, ()=>{
    console.log('esta'+ port)
})
