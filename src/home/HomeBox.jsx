import React from "react";
import styled from "styled-components"
import {BsArrowRightCircle} from "react-icons/bs"

const HomeBox = ({title,onClick}) => {


    return (
            <St_HomeBox onClick={onClick}>
                <St_title>{title}</St_title>
                <BsArrowRightCircle size="32"></BsArrowRightCircle>
            </St_HomeBox>
    )
}

export default HomeBox;

const St_HomeBox = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 20px;
    width: 100%;
    max-width: 960px;
    height: 120px;
    border: 1px solid rgb(238, 238, 238);
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    cursor: pointer;
    margin-top: 15px;
`

const St_title = styled.div`
    font-size: 24px;
`

