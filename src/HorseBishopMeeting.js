import React, { useState } from "react";
import "../src/HorseBishopMeeting.css"

const GridSize = { N: 8, M: 8 };

const initialGrid = Array(GridSize.N).fill(Array(GridSize.M).fill(1));

const HorseBishopMeeting = () => {
  const [grid] = useState(initialGrid);
  const [horsePosition, setHorsePosition] = useState({ x: 6, y: 6 });
  const [bishopPosition] = useState({ x: 3, y: 2 });

  const handleGridClick = (x, y) => {
    if (grid[x][y] === 0) {
      return; // inactive grid, can't be selected
    }

    setHorsePosition({ x, y });
    findMeetingPoint();
  };

  const findMeetingPoint = () => {
    const queue = [];
    const visited = Array(GridSize.N)
      .fill()
      .map(() => Array(GridSize.M).fill(false));

    queue.push({ x: bishopPosition.x, y: bishopPosition.y, steps: 0 });

    while (queue.length > 0) {
      const { x, y, steps } = queue.shift();

      if (x === horsePosition.x && y === horsePosition.y) {
        alert(`Meeting point found at (${x}, ${y}) after ${steps} steps.`);
        return;
      }

      const directions = [
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
      ];

      for (const dir of directions) {
        const newX = x + dir.dx;
        const newY = y + dir.dy;

        if (
          newX >= 0 &&
          newX < GridSize.N &&
          newY >= 0 &&
          newY < GridSize.M &&
          !visited[newX][newY] &&
          grid[newX][newY] !== 0
        ) {
          visited[newX][newY] = true;
          queue.push({ x: newX, y: newY, steps: steps + 1 });
        }
      }
    }

    alert("No meeting point found.");
  };

  return (
    <div className="maincontainer">
      <h1>Horse Bishop Meeting</h1>
      <div className="Table">
        {grid.map((row, x) => (
          <div key={x} style={{ display: "flex" }}>
            {row.map((cell, y) => (
              <div
                key={y}
                onClick={() => handleGridClick(x, y)}
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid black",
                  backgroundColor: cell === 0 ? "gray" : "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {x === horsePosition.x && y === horsePosition.y && (
                  <span role="img" aria-label="horse">
                  🐴
                  </span>
                )}
                {x === bishopPosition.x && y === bishopPosition.y && (
                  <span role="img" aria-label="bishop">
                    ♟
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorseBishopMeeting;

