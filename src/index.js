import express from 'express'

const app = express()

import "./config/config"


app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(process.env["PORT"],()=>{
    console.log(`Running on Localhost:${process.env["PORT"]}`)
})