import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  const username = "ashishchaudhari1857";
  const password = "pass@123";

  if (req.method === "DELETE") {
    const id = req.query.deleteId;
    const data = req.body;
    const flag = data.type==='done'?true:false;
    try {
      const client = await MongoClient.connect(
        `mongodb+srv://${username}:${encodeURIComponent(
          password
        )}@cluster0.zgs18c3.mongodb.net/todolist?retryWrites=true&w=majority`
      );

      const db = client.db();
      console.log(data);
      const todocollection = db.collection("todolist");
      const DoneTaskcollection = db.collection("DoneTask");
      const donetask = await todocollection.findOne({ _id: new ObjectId(id) });
      console.log("this is done task", donetask);
    { flag  && await DoneTaskcollection.insertOne({task:donetask.task})}
      const result = await todocollection.deleteOne({ _id: new ObjectId(id) });
      console.log(result);

      console.log(result.deletedCount);
      if (result.deletedCount === 1) {
        const updatedTasks = await todocollection.find({}).toArray();
        const updatedDoneTask=await DoneTaskcollection.find({}).toArray()

        client.close();
        res.status(201).json({
          message: "delete succeessfully",
          tasks: updatedTasks,
          donetask: updatedDoneTask,
        });
      } else {
        res.status(500).json({ message: "task failed to add" });
      }
    } catch (err) {
      console.error("Error while deleting task:", err);
      res.status(500).json({ message: " server error" });
    }
  } else if (req.method === "PUT") {
    const id = req.query.deleteId;
    const data = req.body;
    console.log(data);
    try {
      const client = await MongoClient.connect(
        `mongodb+srv://${username}:${encodeURIComponent(
          password
        )}@cluster0.zgs18c3.mongodb.net/todolist?retryWrites=true&w=majority`
      );

      const db = client.db();
      console.log(data);
      const todocollection = db.collection("todolist");

      const result = await todocollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      console.log(result);

      console.log(result.modifiedCount);
      if (result.modifiedCount === 1) {
        const updatedTasks = await todocollection.find({}).toArray();

        client.close();
        res
          .status(201)
          .json({ message: "update succeessfully", tasks: updatedTasks });
      } else {
        res.status(500).json({ message: " failed to update" });
      }
    } catch (err) {
      console.error("Error while updating task:", err);
      res.status(500).json({ message: " server error" });
    }
  }
}
