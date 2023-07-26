import React, { useRef, useState } from "react";
import classes from "./todo.module.css";
import { useDispatch, useSelector } from "react-redux";
import TodoList from './TodoList'
import { todoactions } from "../Store/todoSlice";
import { Editaction } from "../Store/Editslice";
const Todo = (props) => {
  const [edit ,setedit]=useState('');
  const itemexist=useSelector(state=>state.edit.isexitst)
  const dispatch=useDispatch()
  const taskref = useRef();
  const submithandler = async (e) => {
    e.preventDefault();
    console.log(taskref.current.value);
    const obj={
      task:taskref.current.value,
    }
    addpost(obj)
     setedit("")

  };


  const addpost = async (task) => {
    let res;
     try{
       if(itemexist){
        
          res = await fetch(`/api/${itemexist.id}` ,{
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
              "Content-Type": "application/json",
            },
          });
       }
       else{
              
           res = await fetch("/api/todopost", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
              "Content-Type": "application/json",
            },
          });
       }
      const data = await res.json();
      console.log(data);
      if(res.status ===201 && itemexist){
        dispatch(Editaction.SetEditactionNull())
      }
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
  }
  const editer=(item)=>{
      setedit(item.task);
 dispatch(Editaction.SetEditaction(item)) 
 }
  return (
    <div>
      <form className={classes.form}>
        <label className={classes.label} htmlFor="task">
          {" "}
          Enter Task{" "}
        </label>
        <input
          value={edit}
          onChange={(e) => setedit(e.target.value)}
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
      <h4>Date:  {props.date}</h4>
      <TodoList edithandler={editer} ></TodoList>
    </div>
  );
};

export default Todo;
