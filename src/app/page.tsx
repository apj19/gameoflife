
"use client"
import { useState, useEffect } from 'react';

export default function HomePage() {
  const rows = 30;
  const cols = 30;
  const g = intialGrid();

  const [grid, setGrid] = useState<number[][]>(g);
  const [gameStart, setGameStart] = useState<boolean>(false);

  function intialGrid() {


    // const grid: number[][] = new Array(rows) as number[][];
    const grid: number[][]= Array.from({ length: rows }, 
      () => (Array(cols).fill(0) as number[]));


    // for (let i = 0; i < rows; i++) {
    //   grid[i] = new Array(cols).fill(0) as number[];
    // }


    function horizontal(r: number, colStart: number, colEnd: number) {

      for (let i = colStart; i <= colEnd; i++) {

        grid[r]![i] = 1
      }
    }
    function vertical(c: number, rowStart: number, rowEnd: number) {
      for (let j = rowStart; j <= rowEnd; j++) {

        grid[j]![c] = 1
      }
    }
    //--a---
    horizontal(5, 2, 9);
    vertical(2, 6, 13);
    vertical(9, 6, 13);
    horizontal(9, 4, 7);



    ///--p-----
    horizontal(5, 11, 18);
    vertical(11, 6, 13);
    vertical(18, 6, 9);
    horizontal(9, 13, 18);



    //--J---
    horizontal(5, 20, 27);
    vertical(27, 6, 13);
    horizontal(13, 20, 27);
    vertical(20, 11, 13);

    ////C----
    horizontal(19, 4, 12);
    vertical(4, 19, 27);
    horizontal(27, 4, 12);



    ///--R-----
    horizontal(19, 18, 26);
    vertical(18, 19, 27);
    vertical(26, 19, 23);
    horizontal(23, 20, 26);

    grid[24]![20] = 1;
    grid[25]![21] = 1;
    grid[26]![22] = 1;
    grid[27]![23] = 1;




    return grid;
  }
  function createrandomGrid() {


    const grid: number[][] = new Array(rows) as number [][];

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols).fill(0) as number[];
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() > 0.8) {
          grid[i]![j] = 1
        } else {
          grid[i]![j] = 0;
        }
      }
    }




    return grid;
  }

  function calculateNeighbors(grid: number[][], x: number, y: number): number {

    let totalNeighbors = 0;

    for (let i = -1; i <= 1; i++) {

      for (let j = -1; j <= 1; j++) {

        const r = x + i;
        const c = y + j;

        if (r >= 0 && c >= 0 && r < rows && c < cols && !(i == 0 && j == 0)) {

          // if (grid[r] !== undefined && grid[r][c] !== undefined) {
          //   totalNeighbors += grid[r][c];
          // }
          if (grid[r]?.[c] !== undefined) {
            totalNeighbors += grid[r][c];
          }

          // totalNeighbors=totalNeighbors+ grid[r][c];
        }
      }
    }
    return totalNeighbors;

  }

  function newGridArray(grid: number[][]): number[][] {
    //all rules of game
    const newgrid: number[][]= Array.from({ length: rows }, 
      () => (Array(cols).fill(0) as number[]));
    // const newgrid: number[][] = new Array(rows) as number [][];

    // for (let i = 0; i < rows; i++) {
    //   newgrid[i] = new Array(cols).fill(0);
    // }

    //
    for (let i = 0; i < rows; i++) {

      for (let j = 0; j < cols; j++) {
        const neighbors = calculateNeighbors(grid, i, j);
        if (grid[i]![j] == 1 && (neighbors < 2 || neighbors > 3)) {
          newgrid[i]![j] = 0;
        } else if (grid[i]![j] == 0 && neighbors == 3) {
          newgrid[i]![j] = 1;
        } else {
            newgrid[i]![j] = grid[i]![j]!;
          
        }


      }
    }

    // console.log(newgrid);
    return newgrid;

  }

  // console.log(newGridArray(grid));
  function handleStart() {
    setGameStart(!gameStart);

  }

  function handleRandom() {
    const temp = createrandomGrid();
    setGrid(temp);
    setGameStart(false);
  }

  useEffect(() => {
    let timeoutId:NodeJS.Timeout;

    if (gameStart) {
       timeoutId = setTimeout(() => {
        // const g = newGridArray(grid);
        setGrid(newGridArray(grid));
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };




  }, [grid, gameStart])





  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white bg-[#0F172A]">
      <h1 className="text-3xl font-bold">Game of life</h1>



      <div className=" border-2 border-gray-500" style={{ display: "grid", gridTemplateColumns: `repeat(${rows},15px)` }}>
        {grid.map((row) => row.map((c, k) => <div key={k}
          className={` w-[15px] h-[15px] ${c == 1 ? "bg-yellow-400" : "bg-[0F172A]"}`} ></div>)

        )
        }
      </div>





      <div className="flex gap-2 mt-4">


        <button type="button" className={`${!gameStart ? 'rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600' : 'rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'} `} onClick={handleStart}>{`${!gameStart ? 'Start' : 'Stop'}`}</button>




        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={handleRandom}
        >
          Random
        </button>

      </div>




    </main>
  );
}
