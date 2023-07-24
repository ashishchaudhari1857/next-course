import { createSlice } from "@reduxjs/toolkit";

const initialState={
    task:[],
    completedtask:[],
}

const todoSlice= createSlice({
    name:"todo",
    initialState,
    reducers:{
        add:(state,actiom)=>{
            state.task=actiom.payload;
        },
        done:(state ,action)=>{
            state.completedtask.push(action.payload);
        }
    }

})


//  const export   todoactions = todoSlice.actions;
export  const  todoactions =  todoSlice.actions;
export   default  todoSlice.reducer;