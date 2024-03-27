import './App.css'
import Squere from "./components/squere"
import puzzle from "./test/CasesJson/puzzle04.json"
import { Board } from './utils/tile';
import { useState } from 'react';
import ManHattanNumber from './components/manHattanNumber';

function App() {
  const board = new Board(puzzle.tiles)
  let GridSize;
  const [manhattan, setManhatan] = useState(0);
  const [grid,setGrid] =useState(board);


  switch (puzzle.size){
    case 2:
      GridSize = "grid-rows-2 grid-cols-2";
      break;
    case 3:
      GridSize = "grid-rows-3 grid-cols-3";
      break;
    case 4:
      GridSize = "grid-rows-4 grid-cols-4";
      break;
  }

  let neighbors:number[] = []
  neighbors.push(grid.Empty-1)
  neighbors.push(grid.Empty+1)
  neighbors.push(grid.Empty-1*grid.Size)
  neighbors.push(grid.Empty + 1 * grid.Size)

  function TransitionEnd(e:TransitionEvent) {
    let dy = grid.empty[0];
    let dx = grid.empty[1];
    switch (neighbors.indexOf()) {
      case 0:
        dy--
        break
      case 1:
        dy++
        break
      case 2:
        dx--
        break
      case 3:
        dx++
        break
    }
    const board = grid.swap(dx, dy)
    if (board) setGrid(board)
  }
  return (
    <>
      <div className='grid bg-background place-content-center  h-full'>
        <div className={`grid  ${GridSize} text-center  grid-flow-row flex flex-row`}>
          {grid.tiles.map((row, rowId) =>
            row.map((col, colId) => {
              return (
                <Squere TranEndCalback={TransitionEnd} emptyIdx={board.Empty} onHover={setManhatan} num={col} key={colId + puzzle.size * rowId} idx={colId + puzzle.size * rowId} />
              )
            }),
          )}

        </div>
        <ManHattanNumber mn={manhattan} />
      </div>
    </>
  )
}

export default App
