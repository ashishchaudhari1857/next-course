import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isexitst: null,
};

const EditSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    SetEditaction: (state, action) => {
      state.isexitst = action.payload;
    },
    SetEditactionNull:(state, action) => {
        state.isexitst = null;
      },
    
  },
});


export  const Editaction = EditSlice.actions;
 export default EditSlice.reducer;