import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeBox from "../home/HomeBox";
import Header from "../components/Header"


const Home = () => {

    const navigate = useNavigate();
    
    return (
        <div>

            <div>
                <St_outline>
                    <Header/>
                    <h1>무엇을 할까요 ?</h1>

                    <HomeBox 
                    title="할일 기록하기"
                    onClick={() => {
                        navigate("/add")
                        //navigate("ADDTodo component")
                    }}/>

                    <HomeBox
                    title="TODO LIST"
                    onClick={() => {
                        navigate("/todos")
                    }}/>
                    
                </St_outline>
            </div>
        </div>
    )
}

export default Home;

const St_outline = styled.div`
margin: 0 auto;
max-width: 1000px;
min-width: 800px;

`
