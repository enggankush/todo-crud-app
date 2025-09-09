// import "./App.css";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AuthCard from "../../components/card/AuthCard";

function TieTacGame() {
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

  const [box, setBox] = useState<string[]>(arr);
  const [count, setCount] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (newBox: string[]) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBox[a] &&
        newBox[a] === newBox[b] &&
        newBox[a] === newBox[c]
      ) {
        setWinner(newBox[a]);
        setLock(true);
        return;
      }
    }
  };

  const handleClick = (index: number) => {
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
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
          {box.map((value, index) => (
            <Button
              key={index}
              sx={button_box}
              onClick={() => handleClick(index)}
            >
              {value}
            </Button>
          ))}
        </Box>

        {/* Winner / Draw Message */}
        {winner && <Typography variant="h6">{winner} wins the game! 🎉</Typography>}
        {!winner && count === 9 && <Typography variant="h6">Draw the game! 🤝</Typography>}

        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={resetGame}
        >
          Reset Game
        </Button>
      </AuthCard>
    </Box>
  );
}

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
  borderRadius: 2,
  margin: 1,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  boxShadow: "0 0 0.5rem rgba(0,0,0,0.3)",
  fontSize: 56,
  fontWeight: "bold",
  color: "#e15757",
};
