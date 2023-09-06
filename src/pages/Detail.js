import React, { useState } from 'react';
import chocolateCakeImage from '../images/chocolateCake.png';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Alert, Nav } from 'react-bootstrap';
import Swal from "sweetalert2";
import { addToCart } from '../store/dataSlice';
import { removeToCart } from '../store/dataSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePlusCnt } from '../store';
import { Button, Modal } from 'react-bootstrap';
import Cart from './Cart';

function Detail(props) {
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(1);
    let [input, setInput] = useState('');
    let [warning, setWarning] = useState(false);
    let [tab, setTab] = useState(0);

    let dispatch = useDispatch();
    let {id} = useParams();
    let selectedItem = props.shoes[id];
    let cart = useSelector(state => state.data);

    let navigate = useNavigate();
    
    useEffect(()=>{
        let timer = setTimeout(()=>{ setAlert(0) }, 2000);
        console.log("let timer");
        return () => { //CleanUP-Function
            //useEffect가 실행 되기 전에 실행되는 코드
            //기존 ~는 제거 //amount시 실행됨
            console.log("CleanUP-Function");
            clearTimeout(timer);
        }
    }, [count]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            setWarning(true);
        } else {
            setInput(value);
        }
    }

    useEffect(() => {
        if (warning == true) {
            Swal.fire('숫자만 입력하세요');
            setWarning(false);
        }
    }, [warning]);

    let [fade, setFade] = useState('');

    useEffect(()=>{
        setTimeout(()=>{setFade('end')}, 100)
        return () => {
            setFade('')
        }
    }, [])

    // 모달창 관련 변수
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className={'start ' + fade}>
        <div className="container">
        {alert == 1 ? 
        (<div className='alert alert-warning'>
            2초 이내 구매시 할인!
        </div>) : null}
            {count}
        <button onClick={()=>{ setCount(count + 1); setAlert(1) }}>버튼</button>
        <div className="row detail-item">
            <div className="col-md-6 detail-img">
            <img src={props.shoes[id].image} width="50%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[id].title}</h4>
            <input
                type='text'
                value={input}
                onChange={handleInputChange}
            />
            <button onClick={() => {setInput(1)}}>클릭</button>
            <p>{props.shoes[id].content}</p>
            <p>{props.shoes[id].price}원</p>
            <button className="btn order-btn" onClick={()=>{
                handleShow();
                let isItemInCart = cart.some(item => item.id === selectedItem.id);
                if (!isItemInCart) {
                    dispatch(addToCart({
                        id: selectedItem.id,
                        name: selectedItem.title,
                        count: 1
                    }));
                } else {
                    dispatch(changePlusCnt(selectedItem.id));
                }
            }}>주문하기</button> 
            </div>
        </div>
        </div>

        <Modal show={show} onHide={handleClose} animation={false} className='modal-cart'>
        <Modal.Header closeButton>
            {/* <Modal.Title>.</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>장바구니에 담았어요 !</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                쇼핑 계속 하기
            </Button>
            <Button variant="light" onClick={()=>{navigate('/cart')}} className='goToCartBtn'>
                장바구니로 이동
            </Button>
        </Modal.Footer>
        </Modal>

        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent shoes={props.shoes} tab={tab}/>
        </div>
        </>
    )
}

function TabContent(props) {
    let [fade, setFade] = useState('');
    useEffect(()=>{
        setTimeout(()=>{setFade('end')}, 100)
        return () => {
            setFade('')
        }
    }, [props.tab])

    if (props.tab == 0) {
        return <div className={'start ' + fade}>내용0 </div>
    } else if (props.tab == 1) {
        return <div className={'start ' + fade}>내용1</div>
    } else if (props.tab == 2){
        return <div className={'start ' + fade}>내용2</div>
    }
}

export default Detail;
