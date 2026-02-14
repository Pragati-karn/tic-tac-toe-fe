import React from "react";
import './CSS/body.css'
import { HomePage } from "./HomePage";
import { useLocation } from "react-router-dom";
import Board from "./components/Board";
import Game from "./Game";

export const Body = () => {
    const location = useLocation();

    const path = location.pathname.split("/").pop();

    return (
        <div className="body1">
            {
                path == "" ? <HomePage /> : <Game />
            }
        </div>
    )
}