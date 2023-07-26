
import { configureStore } from "@reduxjs/toolkit";
import  todoReducer  from './todoSlice'
import EditReducer  from  './Editslice'


const store=configureStore({
     reducer:{todo:todoReducer , edit:EditReducer}
})
 export default store;