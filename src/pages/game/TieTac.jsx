import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AuthCard from "../../components/card/AuthCard";

const TieTacGame = () => {
    const arr = ["", "", "", "", "", "", "", "", ""];
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const [box, setBox] = useState(arr);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(null);
    const [winner, setWinner] = useState(false);

    const checkWinner = (newBox) => {
        for (let Pattern of winPatterns) {
            const [a, b, c] = Pattern;
            if (newBox[a] &&
                newBox[a] === newBox[b] &&
                newBox[a] === newBox[c]) {
                setWinner(newBox[a]);
                setLock(true);
                return;
            }
        }
    };

    const handleClick = (index) => {
        if (lock || box[index] !== "") {
            return;
        }
        const newBox = [...box];
        newBox[index] = count % 2 === 0 ? "X" : "O";
        setBox(newBox);
        setCount(count + 1);
        checkWinner(newBox);
    };

    const resetGame = () => {
        setBox(arr);
        setCount(0);
        setLock(false);
        setWinner(null);
    };

    return (
        <Box sx={game_box}>
            <AuthCard title="Tic-Tac-Toe Game">
                <Box>
                    {box.map((value, index) => (
                        <Button
                            key={index}
                            sx={button_box}
                            onClick={() => {
                                handleClick(index);
                            }}
                        >
                            {value}
                        </Button>
                    ))}
                </Box>
                {winner && <h3>{winner} Win the game!</h3>}
                {!winner && count === 9 && <h3>Draw the game!</h3>}
                <Button variant="contained" sx={{ marginTop: 2 }} onClick={resetGame}>
                    Reset Game
                </Button>
            </AuthCard>
        </Box>
    );
};

export default TieTacGame;

const game_box = {
    height: 570,
    marginTop: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
const button_box = {
    height: 126,
    width: 126,
    borderRadius: 6,
    marginRight: 2,
    marginTop: 2,
    backgroundColor: "#fff",
    border: "none",
    boxShadow: "0 0 1rem rgba(0,0,0,0.5)",
    fontSize: 56,
    color: " #e15757",
};
