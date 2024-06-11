const express=require("express")
let mongodb=require("mongodb")

let url=require('../url')

let mcl=mongodb.MongoClient

let router=express.Router()

router.post('/',(req,res)=>{
    let obj=req.body
    //console.log("object from insert :- ",obj)
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log("Error in conn")
        else{
            let db=conn.db('nodedb')

            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'err'+ err})
                else{
                    console.log("data inserted")
                    res.json({'insert': 'success'})
                    conn.close()
                }
            })
        }
    })
})
module.exports=router