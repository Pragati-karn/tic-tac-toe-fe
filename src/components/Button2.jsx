import React from "react";
import '../CSS/button2.css'


const Button2 = ({ text, onClick }) => {
  return (
    <button className="game-btn2" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button2;

