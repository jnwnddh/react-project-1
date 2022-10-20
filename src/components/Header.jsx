import {FcHome} from "react-icons/fc"
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <div>
      <St_Header>
        <Link to="/">
          <FcHome
          size="30"
          />
        </Link>
        <h2>My Todo List</h2>
      </St_Header>
    </div>
    
  );
};

export default Header;


const St_Header = styled.div`
  align-items: center;
  border: 1px solid #ddd;
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 20px;
  border-radius : 10px;
`

