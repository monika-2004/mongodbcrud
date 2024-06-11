const express=require("express")
let mongodb=require('mongodb')

let url=require('../url')

let mcl=mongodb.MongoClient
let router=express.Router()

router.put('/',(req,res)=>{
   let p_id=req.body.p_id
   let obj={
     p_name:req.body.p_name,
     p_cost: req.body.p_cost
   }

   mcl.connect(url,(err,conn)=>{
      if(err)
        console.log("Error in conn")
      else{
        let db=conn.db('nodedb')
        db.collection('products').updateOne({p_id},{$set:obj},(err,result)=>{
            if(err)
                res.json({"update":"Error"+err})
            else{
                if(result.matchedCount!=0){
                    console.log("Data Updatedd")
                    res.json({"Update":"Sucess"})
                }
                else{
                    console.log("Data not updated")
                    req.json({"update":"record not found"})
                }
                conn.close()
            }
        })
      }
   })
})

module.exports=router