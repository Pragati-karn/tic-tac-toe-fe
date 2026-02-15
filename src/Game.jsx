import React from 'react'
import { Stats } from './components/Stats'
import Board from './components/Board'
import './CSS/Game.css'

const Game = () => {
  return (
    <>
        <div className="gameContainer">
            <div className="boardContainer">
                <Board/>
            </div>
            <div className="statsContainer">
                <Stats />
            </div>
        </div>
    </>
  )
}

export default Game