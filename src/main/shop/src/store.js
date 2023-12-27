import { configureStore, createSlice } from "@reduxjs/toolkit";

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

let stock = createSlice({
  name : 'stock',
  initialState : [10, 11 ,12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id: 0, name: 'White and Black', count: 2},
    {id: 2, name: 'BlueRoyal', count: 1}
  ],
  reducers : {
    addCount(state, action) {
      // state[cation.payload].count++
      let id = state.findIndex((a) => { return a.id === action.payload})
      state[id].count++
    },
    addItem(state, action) {
      state.push(action.payload)
    }
  }
})

export let { addCount, addItem } = cart.actions;


export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
})