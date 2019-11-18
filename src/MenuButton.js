
import React from 'react';
import styled from 'styled-components';
import { COLORS } from './Defaults';


const NavFlicker = styled.div`
border-radius: 50%;
width: 22px;
height: 22px;
background: red;
color: white;
text-align: center;
font: 20px Arial, sans-serif;
float: right;
animation: blinker 1.2s linear infinite;
    @keyframes blinker {
    50% {
        opacity: 0;
    }
}
`;
const MenuStyle = styled.div`
  width: 30%;
  text-align: center;
  ${(props) => (props.position === 'left' ? 'margin-left' : 'margin-right')}: auto;
  background-color: ${(props) => (props.selected ? COLORS.SELECTED : COLORS.GRADIENT_BLACK)};
  color: ${(props) => (props.selected ? 'black' : 'white')};
`;

function MenuButton(props) {
  const {
    selected, position, imgAlt, imgSource, text, onClick, // eslint-disable-line react/prop-types
  } = props;

  return (
    <MenuStyle onClick={onClick} selected={selected} position={position}>
      <img src={imgSource} alt={imgAlt} />
      {text}
      {selected ? null : <NavFlicker> ! </NavFlicker> }
    </MenuStyle>

  );
}

export default MenuButton;
