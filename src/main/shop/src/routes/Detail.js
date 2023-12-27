import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Context1 } from "../App";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'orange' ? 'white' : 'black'};
    padding : 10px;
`

let NewBtn = styled(YellowBtn)`
    margin : 5px;
`

let Box = styled.div`
    background : grey;
    padding : 20px;
`

function Detail(props) {

    let {stock} = useContext(Context1);
    let [count, setCount] = useState(0);
    let {id} = useParams();
    let [alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0);

    let dispatch = useDispatch();
    
    useEffect(() => {
        console.log(id);
        console.log(localStorage.getItem('watched'));

        let findId = localStorage.getItem('watched');
        findId = JSON.parse(findId);
        findId.push(id);
        findId = new Set(findId);
        findId = Array.from(findId);
        localStorage.setItem('watched', JSON.stringify(findId));
    })

    useEffect(() => {
        console.log('hi') // mount, update 시 동작
        let timer = setTimeout(() => {
            setAlert(false);
        }, 3000);

        return () => { // unmount 될 때 실행
            clearTimeout(timer);
        }
    },[count])

    // useEffect(() => {
    //     let log = localStorage.getItem('watched');
    //     log = JSON.parse(log);
    //     log.push(id);
    //     log = new Set(log);
    //     log = [...log];
    //     localStorage.setItem('watched', JSON.stringify(log));
    // },[])
    
    return(
        <div className="container">
            {stock}
            { alert == true ? 
                    <div className="alert alsert-warning" style={{background : "yellow"}}>
                        3초 이내 구매시 할인
                    </div>
                    : null
            }


            <Box>
                <YellowBtn bg="yellow" onClick={() => { setCount(count + 1)}}>버튼</YellowBtn>
                <YellowBtn bg="orange" onClick={() => { console.log("오렌지 버튼 클릭")}}>버튼</YellowBtn>
                <NewBtn bg="orange">버튼</NewBtn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src={'/image/shoes' + (Number(id) + 1) + '.jpg'}></img>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className="btn btn-danger" onClick={() => {dispatch(addItem({id: props.shoes[id].id, name: props.shoes[id].title, conut: 1}))}}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => {setTab(0)}}>상세페이지</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => {setTab(1)}}>리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => {setTab(2)}}>Q&A</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab}/>

        </div>
    )
}

function TabContent({tab}) {
    // if (tab == 0) {
    //     return <div>상세페이지</div>
    // }else if (tab == 1) {
    //     return <div>리뷰</div>
    // }else if (tab == 2) {
    //     return <div>Q&A</div>
    // }
    let [fade, setFade] = useState('');
    let {stock} = useContext(Context1);
    useEffect (() => {
        setTimeout(() => {setFade("end")}, 100)
        return () => {
            setFade('')
        }
    },[tab])

    return (
        <div className= {"start " + fade}>
            {[<div>상세페이지</div>, <div>{stock}</div>, <div>Q&A</div>][tab]}
        </div>
    )
}

export default Detail;