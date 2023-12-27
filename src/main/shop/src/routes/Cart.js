import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase, addCount} from "../store";
import { memo, useState } from "react";

// function Child() {
//   console.log("재렌더링됨")
//   return <div>자식임</div>
// }

let Child = memo( function() {
  console.log("재렌더링됨")
  return <div>자식임</div>
})

function Cart() {

  let state = useSelector((state) => { return state}); // store에 있는 값을 들고오는 훅 함수
  // console.log(a)
  // console.log(a.user)
  // console.log(a.stock)
  console.log(state.cart);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  return(
    <div>
      <Child count={count}/>
      <button onClick={() => {setCount(count + 1)}}>+</button>
      <h6>{state.user.name} {state.user.age} 의 장바구니</h6>
      <button onClick={() => {
        dispatch(increase(1))
      }}>버튼</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map((a,i) =>
              <tr>
                <td>{i}</td>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td><button onClick={ () => {dispatch(addCount(state.cart[i].id))}}>+</button></td>
              </tr>
              )}
        </tbody>
      </Table>
    </div>
  )
}

export default Cart;