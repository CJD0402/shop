/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import bg from './image/bg.png';
import data from './data.js';
import { Suspense, createContext, lazy, useEffect, useState } from 'react';
import { Routes, Route, Link , useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
import { useQuery } from 'react-query';
export let Context1 = createContext()

// const Detail = lazy( () => import('./routes/Detail.js'))
// const Cart = lazy( () => import('./routes/Cart.js'))

function App() {

  let obj = { name: "hong"}
  localStorage.setItem('data', JSON.stringify(obj))
  // console.log(JSON.parse(localStorage.getItem('data')).name)
  localStorage.removeItem('data')

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [stock] = useState([10, 11, 12]);

  useEffect(() => {
    if(localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])

  let result = useQuery('name', () => {
    return axios.get('api/name')
                .then((a) => {
                  console.log(a.data)
                  return a.data
                })
  })

  // description: result.data => 성공 했을 때의 데이터를 보여 줌 //
  // description: result.isLoading => 요청이 로딩중일때 true라고 보여줌 //
  // description: result.error => 요청이 실패했을 때 true를 보여줌 //

  return (
    <div className="App">


      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}} style={{padding : '5px', textDecoration : 'none', color : 'white'}}>홈</Nav.Link>
            <Nav.Link onClick={() => {navigate("/detail")}} style={{padding : '5px', textDecoration : 'none', color : 'white'}}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => {navigate("/cart")}} style={{padding : '5px', textDecoration : 'none', color : 'white'}}>장바구니</Nav.Link>
          </Nav>
          <Nav className='ms-auto' style={{color : 'white'}}>
            { result.isLoading ? '로딩중' : result.data }
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path='/' element={
            <>
              <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')'}}></div>

              <div className='container'>
                <div className='row'>   
                  {
                    shoes.map((a, i) => {
                      return (
                        <Card shoes={shoes[i]} i={i}/> 
                      )
                    })
                  }    
                </div>
              </div>
              <button onClick={() => {
                axios.get('/api/data')
                .then( (response) => {
                  console.log(response.data.data)
                  console.log({shoes})
                  let copy = [...shoes, ...response.data.data];
                  setShoes(copy)
                })
                .catch( (error) => {
                  console.log(error)
                })

                axios.post('/api/postData', {name : "shoes777"})
                .then( (repsonse) => {
                  console.log(repsonse)
                })
                .catch ((error) => {
                  console.log(error)
                })

              }}>
                버튼
              </button>

            </>
          }></Route>
          <Route path='/detail/:id' element={
            <Context1.Provider value={{stock}}>
              <Detail shoes={shoes}/>
            </Context1.Provider>
          }></Route>

          <Route path='/cart' element={<Cart/>}></Route>

          <Route path='/about' element={<About/>}>
            <Route path='member' element={<div>멤버</div>}></Route>
            <Route path='location' element={<div>위치</div>}></Route>
          </Route>

          <Route path='*' element={<div>없는 페이지 입니다.</div>}></Route>
        </Routes>
      </Suspense>

    </div>
  );
}

function About() {
  return(
    <div>
      <h3>회사정보</h3>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return(
    <div className='col-md-4'>
      <img src={process.env.PUBLIC_URL + '/image/shoes' + (props.i + 1) + '.jpg'} height= '80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
