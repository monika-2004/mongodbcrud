const express=require("express")
let mongodb=require("mongodb")

let url =require("../url")

let mcl=mongodb.MongoClient

let router=express.Router()

router.delete('/',(req,res)=>{
    let obj={
        "p_id":req.body.p_id
    }

    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log("Error in conn")
        else{
            let db=conn.db('nodedb')
            db.collection("products").deleteOne(obj,(err,
                result)=>{
                if(err)
                    res.json({"delete": "error" +err})
                else{
                    if(result.deletedCount!=0){
                        console.log("data deleted")
                        res.json({"delete":"success"})
                    }
                    else{
                        console.log("Data not deleted")
                        res.json({"delete":"record not found"})
                    }
                    conn.close()
                }
            })
        }
    })
})
module.exports=router