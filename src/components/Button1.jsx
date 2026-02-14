import React from "react";
import '../CSS/button1.css'


const Button = ({ text, onClick }) => {
  return (
    <button className="game-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
