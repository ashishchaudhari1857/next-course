// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  const username = "ashishchaudhari1857";
  const password = "pass@123";
  if (req.method === "POST") {
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
      const result = await todocollection.insertOne(data);
      if (result.insertedId) {
        const updatedTasks = await todocollection.find({}).toArray();
        
        client.close();
        res.status(201).json({ message: "task added successfully", tasks: updatedTasks });
      } 
      else {
        res.status(500).json({ message: "task failed to add" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
  
}
