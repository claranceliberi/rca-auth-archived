import express from 'express'
const app = express()

const PORT = 3000

app.get('/',(req,res) => {
    res.send(' Express + Typescript servers')
})
    

app.listen(PORT,()=>{
    console.log(`⚡️[Server]: server is runnng at https://localhost:${PORT}`)
})