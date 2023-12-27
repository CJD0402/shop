import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name : 'user', // => state 이름
  initialState : {name : 'hong', age : 20}, // 값
  reducers : {
    changeName(state) {
      // return {name: "hong gildong", age: 20}
      state.name = "hong gildong"
    },
    increase(state, a) {
      state.age += a.payload
    }
  }
})

export let {changeName, increase} = user.actions;
export default user;