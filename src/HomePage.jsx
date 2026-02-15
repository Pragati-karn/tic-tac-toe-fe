import React, { useState } from "react";
import "./CSS/HomePage.css";
import Button from "./components/Button1";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { payLoadContext } from "./App";

import axios from "axios";

export const HomePage = () => {
  const navigate = useNavigate();
  const { setPayload } = useContext(payLoadContext);

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [age1, setAge1] = useState("");
  const [age2, setAge2] = useState("");

  const payload = {
    player1: { name: name1, age: age1 },
    player2: { name: name2, age: age2 },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://tic-tac-toe-be-2.onrender.com/submitPlayer",
        payload,
      );
      setPayload(payload);
      navigate("/getBoard");
    } catch (err) {
      console.error(err);
      alert("Failed to start game");
    }
  };

  console.log(payload);

  return (
    <div className="homePageSetup">
      <form onSubmit={onSubmit}>
        <div className="players">
          <div className="player pl1">
            <label>Player 1:</label>
            <input
              className="in1"
              type="text"
              placeholder="Name of Player 1*"
              value={name1}
              required
              onChange={(e) => setName1(e.target.value)}
            />
            <input
              className="in1"
              type="number"
              placeholder="Age of Player 1"
              value={age1}
              onChange={(e) => setAge1(e.target.value)}
            />
          </div>

          <div className="player pl2">
            <label>Player 2:</label>
            <input
              className="in2"
              type="text"
              placeholder="Name of Player 2*"
              value={name2}
              required
              onChange={(e) => setName2(e.target.value)}
            />
            <input
              className="in2"
              type="number"
              placeholder="Age of Player 2"
              value={age2}
              onChange={(e) => setAge2(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" text="Start" />
      </form>
    </div>
  );
};
