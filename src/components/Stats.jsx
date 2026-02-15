import { useState, useEffect, useContext } from "react";
import "../CSS/Stats.css";
import axios from "axios";
import { payLoadContext } from "../App";

export const Stats = () => {
  const { payload, winner } = useContext(payLoadContext);

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://tic-tac-toe-be-2.onrender.com/scoreCard",
        );
        setPlayer1Wins(res.data.winsByPlayer0);
        setPlayer2Wins(res.data.winsByPlayer1);
        setTotalGames(res.data.totalMatches);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [winner]);

  return (
    <div className="statsBody">
      <h2 className="statsHeader">Game Statistics</h2>
      <div className="stats">
        <p className="p1">
          <strong></strong> {payload?.player1?.name || "Unknown"} –{player1Wins}
        </p>
        <p className="p2">
          <strong></strong> {payload?.player2?.name || "Unknown"} –{player2Wins}
        </p>
        <p className="total">
          <strong>Total Games Played:</strong> {totalGames}
        </p>
      </div>
    </div>
  );
};
