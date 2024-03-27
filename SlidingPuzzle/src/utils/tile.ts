export class Board {
    tiles:number[][];
    manhattanN=0;
    col:number;
    Size:number;
    gScore = Number.MAX_VALUE;
    fScore = 0;
    hammingN = 0;
    empty:number[]=[];
    Empty:number=0;
    str=''
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    constructor(tile:number[][]){
      this.tiles = tile;
      this.col = tile[0].length;
      this.Size = this.col
      this.hammingN =0 
      this.str+=`${this.col}\n`
      for(let i=0;i<this.col;i++){
        for(let j=0;j<this.col;j++){
          const num = this.tiles[i][j];
          this.str += `${num}\t`;    
          if(num===0){
            this.Empty = i+j*this.Size;
            this.empty= [i,j]
          }
          else{
            this.calcManhattanNum(num,i,j)
            }
        }
      this.str+='\n'
      }
    }
    calcManhattanNum(num:number,i:number,j:number){
      const goalRow = Math.floor((num - 1) / this.col);
      const goalCol = (num - 1) % this.col;
      const dy = Math.abs(i - goalRow);
      const dx = Math.abs(j - goalCol)
      const distances = dx + dy
      distances !== 0 ? this.hammingN += 1 : {}
      this.manhattanN += distances;
    }
    // string representation of this board
    toString():string{
      return this.str;
    }
    // tile at (row, col) or 0 if blank
    tileAt(row:number, col:number):number{
        return this.tiles[row][col]
    }
    // board size n
    size():number{
      return this.col;
    }
    // number of tiles out of place
    hamming():number{
      return this.hammingN;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan():number{
      return this.manhattanN;
    }
    // is this board the goal board?
    isGoal():boolean{
      return this.manhattanN==0;
    }
    // does this board equal y?
    equals(board:Board){
      if(board.Size != this.Size){
        return false;
      }
      for(let i=0;i<this.col;i++){
        for(let j=0;j<this.col;j++){
          if(board.tiles[i][j]!=this.tiles[i][j]){
              return false; 
          }
        }
      }
      return true;
    }

    // all neighboring boards
    neighbors():Board[]{
      const neighborsList:Array<Board> = [];
      this.getlegalNeighbors().forEach((values)=>{
       neighborsList.push(this.swap(values.i,values.j))
      })
      return neighborsList;
    }

    getlegalNeighbors():{i:number,j:number}[]{
      let x = this.empty[0]
      let y = this.empty[1]
      const neighbors: { i: number, j: number }[] = [{ i: x - 1, j: 0 }, { i: x + 1, j: 0 },
                                                     { i: 0, j: y - 1 }, { i: 0, j: y + 1 }]
      const legals = ({ i, j }: { i: number, j: number }) => (i >= 0 && i < this.Size &&
                                                              j >= 0 && j < this.Size)
      return neighbors.filter(legals)

    }

    swap(dx:number,dy:number):Board{
          let copy:number[][] = []
          this.tiles.map((row)=>{
            copy.push(row.slice())
          })
          copy[this.empty[0]][this.empty[1]] = copy[dx][dy]
          copy[dx][dy] = 0
          const newBoard:Board = new Board(copy)
          return newBoard
  }

    // is this board solvable?
    isSolvable():boolean{
    let inverstion = 0
    let row =0 
    const flat = this.tiles.flat(1)
    for(let i=0;i<flat.length;i++){
      for(let j=i;j<flat.length;j++){
        if (flat[j] == 0) {
          row = j;
        }
        else if (flat[i] > flat[j]) {
          inverstion++
        }
      }
    }
    if(this.Size%2==0){
      if((inverstion+row)%2==1){
        return true
      }
      return false
    }
    else{
      if(inverstion%2==0){
        return true
      }
      return false

    }
  }
}
