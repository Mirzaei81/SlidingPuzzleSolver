import {Board} from "./tile"
import { PriorityQueue } from "../utils/Piorityqueue";

class IllegalArgumentException extends Error {
  constructor(message:string) {
    super(message);
    this.name = 'IllegalArgumentException';
  }
}

export class Solver{
  board:Board;
  move:number=0;
  constructor(board:Board){
    this.board = board;
  }

  moves():number{
    return this.move;
  }
  solution(camefrom:Map<string,Board|null>,end:Board):Board[]{
    let path:Board[] = [];
    while(end){
        path.unshift(end);
        end = camefrom.get(end.toString())!
    }
    return path.reverse();
  }
  solve(board:Board):Board[]{
    if(!board.isSolvable()){
      throw new IllegalArgumentException("Board is not solvable")
    }
    let openSet:PriorityQueue= new PriorityQueue()
    openSet.insert(board)
    let came_from:Map<string,Board|null> = new Map()
    let gScore:Map<string,number> = new Map()

    gScore.set(board.str,0)

    let counter=0
    while(!openSet.isEmpty()){
      if(counter==10){
          break
      }

      let current = openSet.pop()!;
      if(current.isGoal()){
        return this.solution(came_from,current)
      }

      console.log(current.str+current.fScore)
      current.neighbors().forEach(next=>{
        let new_cost = gScore.get(current.str)! + 1
        if (!gScore.has(next.str) || new_cost < gScore.get(next.str)!) {
          came_from.set(next.str, current)
          gScore.set(next.str,new_cost)
          next.fScore = new_cost + next.manhattanN
          openSet.insert(next)
        }
      })
      counter++
    }
    throw new IllegalArgumentException("Board is not solvable even tough it should ")
  }
}

