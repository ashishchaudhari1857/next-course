import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoactions } from "../Store/todoSlice";
import classes from "./TodoList.module.css";
import { Editaction } from "../Store/Editslice";
import DoneTask from "./DoneTask";
const taskList = (props) => {
  const dispatch = useDispatch();
  const deletehandler = async (id ,buttontype) => {
       console.log(buttontype)
    dispatch(Editaction.SetEditactionNull())
    try {
      const res = await fetch(`/api/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ type: buttontype }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        const newarray = data.tasks.map((item) => ({
          id: item._id.toString(),
          task: item.task,
        }));
        dispatch(todoactions.done(data.donetask));
        dispatch(todoactions.add(newarray));
      } else {
        throw Error("error in fetching");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const todo = useSelector((state) => state.todo.task);
  const list = todo.map((item, index) => (
    <div className={classes.task} key={index}>
      <ul >
        <li>
          {index + 1}. {item.task}
        </li>
        <li>
          <button className={classes.button} onClick={()=>{deletehandler(item.id, 'done')}}>Done</button>
        </li>
        <li>
          <button className={classes.button} onClick={() => props.edithandler(item)}>Edit</button>
        </li>
        <li>
          <button  className={classes.button} onClick={()=>{deletehandler(item.id, 'delete')}}>X</button>
        </li>
      </ul>
    </div>
  ));

  return <div className={classes.taskcontainer}>
    <div>
    <h3 style={{textAlign:"center"}}>TaskList </h3>
    {list}
    </div>
    <DoneTask></DoneTask>
    </div>;
};

export default taskList;
