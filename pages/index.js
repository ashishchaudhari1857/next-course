import Head from "next/head";
import { MongoClient } from "mongodb";
import styles from "../styles/Home.module.css";
import Todo from "../Componets/Todo";
import TodoList from "../Componets/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { todoactions } from "../Store/todoSlice";
import { useState } from "react";

export default function Home(props) {
  const [lastdaate, setlastdate] = useState("");
  const dispatch = useDispatch();
  dispatch(todoactions.add(props.data));
  dispatch(todoactions.done(props.donetask));
  console.log(props.lastDate);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
      </Head>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <hr></hr>
      <Todo date={props.lastDate}></Todo>
      {/* <TodoList></TodoList> */}
    </div>
  );
}
// dispatch(todoactions.add(data))
//

export async function getServerSideProps(context) {
  const username = "ashishchaudhari1857";
  const password = "pass@123";

  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${encodeURIComponent(
      password
    )}@cluster0.zgs18c3.mongodb.net/todolist?retryWrites=true&w=majority`
  );

  const db = client.db();
  const DoneTaskcollection = db.collection("DoneTask");

  const todocollection = db.collection("todolist");

  const settingscollection = db.collection("settings");

  // Check if the "lastdate" exists in the settings collection
  const settings = await settingscollection.findOne({ key: "lastdate" });
  let lastDate;
  if (!settings) {
    await settingscollection.insertOne({
      key: "lastdate",
      lastdate: new Date().toLocaleDateString(),
    });
    lastDate = new Date().toLocaleDateString();
  } else {
    lastDate = settings.lastdate;
  }
  //  day change

  if (lastDate !== new Date().toLocaleDateString()) {
    await todocollection.deleteMany({});
    await DoneTaskcollection.deleteMany({});
    await settingscollection.insertOne({
      key: "lastdate",
      lastdate: new Date().toLocaleDateString(),
    });
    lastDate = new Date().toLocaleDateString();
  }

  const updatedDoneTask = await DoneTaskcollection.find({}).toArray();

  const result = await todocollection.find().toArray();
  const data = result.map((item) => ({
    id: item._id.toString(),
    task: item.task,
  }));
  const resultOfDoneTask = updatedDoneTask.map((item) => ({
    id: item._id.toString(),
    task: item.task,
  }));

  return {
    props: { data: data, donetask: resultOfDoneTask, lastDate: lastDate },
  };
}
