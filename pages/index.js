import Head from 'next/head'
import { MongoClient } from 'mongodb'
import styles from '../styles/Home.module.css'
import Todo from '../Componets/Todo'
import TodoList from '../Componets/TodoList'
import { useSelector,useDispatch } from 'react-redux'
import { todoactions } from '../Store/todoSlice'


export default function Home(props) {
 const dispatch  =useDispatch();
   dispatch(todoactions.add(props.data))
  
  return (   
   <div className={styles.container}>
    <Head>
        <title>Todo App</title>
      </Head>
      <h1 style={{textAlign:"center"}}>Todo App</h1>
        <Todo ></Todo>
      <TodoList></TodoList>
  </div>
  )
}
// dispatch(todoactions.add(data))
 // 


export  async  function  getServerSideProps(context){

  const username = "ashishchaudhari1857";
  const password = "pass@123";
  
    const client=  await MongoClient.connect(`mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.zgs18c3.mongodb.net/todolist?retryWrites=true&w=majority`)
    
    const db = client.db();
     const todocollection= db.collection("todolist");
      const result = await  todocollection.find().toArray()
          const data=result.map(item=>(
            { id:item._id.toString(),
              task:item.task,
            }
            ))
            
  return{
    props:{ data:data}
}

}
