const express= require('express')
const app=express()
const port=process.env.PORT || 3000
const {Pool}=require('pg')

//EJS Template
app.set('view engine','ejs')

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'Inventory',
    password:'pass'
})
//getting home page
app.get('/',async(req,res)=> {
    try{
        res.render('home')
    }
    catch(e){
        console.log(`Error in getting a page ${e}`)

    }
}
)
//getting customer page 
app.get('/customer',async(req,res)=> {
    try{
        res.render('customer')
    }
    catch(e){
        console.log(`Error in getting a page ${e}`)

    }
}
)

app.get('/cust',async(req,res)=>{
    const client=await pool.connect()
    try{
        const value = await client.query('SELECT * from customer')
        console.log(value.rows)
        res.sendStatus(200)
    }
    catch(e){

    }finally{
        client.release()
    }
})
app.listen(port,()=>{
    console.log(`listening to the port no ${port}`)
}
)
