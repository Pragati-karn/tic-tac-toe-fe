import "../CSS/Board.css";
import { Navbar } from "../Navbar";
import Button from "./Button1";
import Button2 from "./Button2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { payLoadContext } from "../App";


const Board = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([[]]);
  const [turn, setTurn] = useState(0);
  const [move, setMove] = useState(null);
  const { winner, setWinner, payload } = useContext(payLoadContext);
  const GoBack = async () => {
    try {
      navigate("/");
      await axios.post("http://localhost:8081/tictactoe/getBoard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUndo = async () => {
    try {
      const res = await axios.post("http://localhost:8081/tictactoe/undoMove");
      setBoard(res.data.board);
      setTurn(res.data.turn);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/tictactoe/getBoard")
      .then((res) => {
        setBoard(res.data.board);
        setTurn(res.data.turn);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!move) return;

    axios
      .post("http://localhost:8081/tictactoe/writeValue", move)
      .then((res) => {
        setBoard(res.data.board);
        setTurn(res.data.turn);

        return axios.post("http://localhost:8081/tictactoe/winner");
      })
      .then((winnerRes) => {
        console.log("Winner:", winnerRes.data);
        setWinner(winnerRes.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [move]);

  useEffect(() => {
    if (!payload) {
      navigate("/");
    }
  }, [payload, navigate]);

  if (!payload) return null;

  useEffect(() => {
    if (winner === "") return;
    try {
      const resetBoard = async () => {
        const res = await axios.get("http://localhost:8081/tictactoe/getBoard");
        setBoard(res.data.board);
        setTurn(res.data.turn);
      };
      resetBoard();
    } catch (err) {
      console.error(err);
    }
  }, [winner]);

  const handleWrite = (index) => {
    const row = Math.floor(index / 3);
    const column = index % 3;

    setMove({ row, column });
  };

  const getCellClass = (value) => {
    if (value === "X") return "cell x";
    if (value === "O") return "cell o";
    return "cell";
  };

  return (
    <div className="boardBody">
      <div className="board">
        {Array.from({ length: 3 }).map((_, i) =>
          Array.from({ length: 3 }).map((_, j) => {
            const index = i * 3 + j;
            const cellValue = board?.[i]?.[j];

            return (
              <div
                key={index}
                className={getCellClass(cellValue)}
                onClick={() => handleWrite(index)}
              >
                {cellValue}
              </div>
            );
          }),
        )}
      </div>

      <div className="btns">
        <Button text="Undo" onClick={handleUndo} />
        <Button2 text="Cancel" onClick={GoBack} />
      </div>
    </div>
  );
};

export default Board;
