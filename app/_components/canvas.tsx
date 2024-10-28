'use client'
import isWinner from "../logic/win"
import React, { useEffect, useRef } from 'react';

const CanvasGrid: React.FC = ({ onDataUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 37;  // Size of each cell in the grid
  const placedCircles = []
  const data = {
    turn: "black",
    moveList: [],
  }
  const handleTurnChange = (newdata: object) => {
    // I need to do this because apperently changing an attribute of an object is not actually changing an object
    const newerdata = { ...newdata }
    onDataUpdate(newerdata)
  };

  const squareClicked = (col: number, row: number) => {
    console.log(`Square clicked at column: ${col}, row: ${row}`);
    // alert(`You clicked square at column ${col}, row ${row}`);
    let color
    if (data.turn == 'black') {
      color = 'red'
    } else {
      color = 'black'
    }
    data.turn = color
    data.moveList.push([color, toString(col), toString(row)])
    handleTurnChange(data)

    drawCircleInSquare(col, row, color)
    placedCircles.push([col, row, color])
    const winner = isWinner(placedCircles)
    if (winner[0] === true) {
      drawLineBetweenSquares(winner[1][0], winner[1][1], winner[2][0], winner[2][1])
    }
    console.log(winner)
  };

  const drawLineBetweenSquares = (startCol: number, startRow: number, endCol: number, endRow: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate the centers of the start and end squares
    const startX = startCol * gridSize + gridSize / 2;
    const startY = startRow * gridSize + gridSize / 2;
    const endX = endCol * gridSize + gridSize / 2;
    const endY = endRow * gridSize + gridSize / 2;

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'blue';  // Set line color to blue
    ctx.lineWidth = 3;         // Set line width
    ctx.stroke();
  };

  // Function to draw a circle inside the clicked square
  const drawCircleInSquare = (col: number, row: number, color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate the center of the clicked square
    const centerX = col * gridSize + gridSize / 2;
    const centerY = row * gridSize + gridSize / 2;
    const radius = gridSize / 2.1;

    // Draw the circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

  };


  const handleCanvasClick = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;  // X position relative to the canvas
    const y = event.clientY - rect.top;   // Y position relative to the canvas

    // Calculate which square was clicked
    const col = Math.floor(x / gridSize);
    const row = Math.floor(y / gridSize);

    squareClicked(col, row);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Function to draw the grid
    const drawGrid = () => {
      ctx.strokeStyle = '#cccccc';  // Light gray color for grid lines
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }
    };

    drawGrid();

    canvas.addEventListener('click', handleCanvasClick);



    // Cleanup event listener on unmount
    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  return (
    <div className='flex justify-center'>
      <canvas
        ref={canvasRef}
        // style={{ width: '100%', height: "auto" }}
        width={370}
        height={705}
      // style={{ border: '1px solid black' }}
      /></div>
  );
};

export default CanvasGrid;
