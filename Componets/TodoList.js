import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event';
import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { todoactions } from '../Store/todoSlice';
const taskList = (props) => {
  const dispatch =useDispatch();
  const deletehandler =async(id)=>{
     
      try
      {
        const res= await fetch(`/api/${id}`,{
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
          },
         })
         
         const data= await res.json();
         console.log(data)
         if(res.status===201){
            const newarray= data.tasks.map((item)=>(
             {
              id:item._id.toString(),
              task:item.task,
             }
            ))
            dispatch(todoactions.done(data.donetask))
          dispatch(todoactions.add(newarray))
         }
         else {
          throw Error("error in fetching");
        }
      } catch(err){
        console.log(err)
      }
  } 

  
  const todo=useSelector(state=>state.todo.task)
  const list = todo.map((item, index) => (
    <ul key={index} style={{listStyle:"none"}}>
      <div>
      <li>{index + 1}. {item.task}</li>
      <li><button onClick={deletehandler.bind(null, item.id)}>Done</button></li>
      <li><button>Edit</button></li>
      </div>
    </ul>
  ));

  return (
    <div>
      {list}
    </div>
  );
};

export default taskList;