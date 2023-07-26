import React from 'react';
 import { useSelector } from 'react-redux';
 import classes from './TodoList.module.css'
const DoneTask = () => {
    const donetasks=useSelector(state=>state.todo.completedtask);
    const list = donetasks && donetasks.map((item, index) => (
        <div key={index} className={classes.task}>
          <ul  >
            <li>
              {index+1}.  {item.task}
            </li>
          </ul>
        </div>
      ));

  return (
    <div>
        <h3 style={{textAlign:"center"}}>Done Tasks</h3>

      {list}
    </div>
  );
};

export default DoneTask;