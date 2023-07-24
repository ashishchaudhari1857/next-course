import React, { useRef } from "react";
import classes from "./todo.module.css";
import { useDispatch } from "react-redux";
import { todoactions } from "../Store/todoSlice";
const Todo = (props) => {
  const dispatch=useDispatch()
  const taskref = useRef();
  const submithandler = async (e) => {
    e.preventDefault();

    console.log(taskref.current.value);
    const obj={
      task:taskref.current.value,
    }
    addpost(obj)

  };

  const addpost = async (task) => {
    try {
      const res = await fetch("/api/todopost", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if(res.status===201){
        const newarray= data.tasks.map((item)=>(
          {
           id:item._id.toString(),
           task:item.task,
          }
         ))
    dispatch(todoactions.add(newarray))
      }else{
        throw Error("error in fetching")
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className={classes.form}>
        <label className={classes.label} htmlFor="task">
          {" "}
          Enter Task{" "}
        </label>
        <input
          ref={taskref}
          tyupe="text"
          className={classes.input}
          placeholder="Enter Tasks of day"
        ></input>
        <button className={classes.actions} onClick={submithandler}>
          {" "}
          Add Task+
        </button>
      </form>
    </div>
  );
};

export default Todo;
