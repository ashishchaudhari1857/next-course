 import { ObjectId } from "mongodb"
 import { MongoClient } from "mongodb"
 export default async function handler(req, res) {
   const username = "ashishchaudhari1857";
   const password = "pass@123";
    const id =req.query.deleteId;
   if (req.method === "DELETE") {
     const data = req.body;
     try {
       const client = await MongoClient.connect(
         `mongodb+srv://${username}:${encodeURIComponent(
           password
         )}@cluster0.zgs18c3.mongodb.net/todolist?retryWrites=true&w=majority`
       );
 
       const db = client.db();
       console.log(data);
       const todocollection = db.collection("todolist");
       const  donetask =await todocollection.findOne({_id: new ObjectId(id)})

      const result =await todocollection.deleteOne({_id: new ObjectId(id)});
      console.log(result)

      console.log(result.deletedCount)
      if(result.deletedCount===1){
         const updatedTasks = await todocollection.find({}).toArray();
        
        client.close();
        res.status(201).json({ message: "delete succeessfully", tasks: updatedTasks , donetask:donetask})
    
      }else
      {
         res.status(500).json({ message: "task failed to add" });

      }


     }
   catch(err){
      console.error("Error while deleting task:", err);
      res.status(500).json({ message: " server error" });

   }
}
}