import {Board} from "./tile.ts"

export class PriorityQueue{
  elements:Board[]=[]
  map:Map<string,number> = new Map()// return index of given board in elements[] with key  of string 

  getParent(idx:number):number{
    return Math.floor((idx-1)/2)
  }
  getleftChild(idx:number):number{
    return 2*idx
  }

  getrightChild(idx:number):number{
    return 2*(idx) +1
  }

  insert(element:Board) {
    if(this.map.has(element.str)){
      const idx = this.map.get(element.str)!
      this.elements[idx].fScore +=1
      this.bubbleDown(idx)
    }
    else{
      this.elements.push(element);
      this.bubbleUp(this.elements.length - 1);
    }
  }
  swap(f:number,l:number){
    let temp = this.elements[f]
    this.elements[f] = this.elements[l]
    this.elements[l] = temp
  } 
  
  peak(){
    return this.elements[0]
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const rootNode = this.elements[0];
    const lastNode = this.elements.pop()!;
    if (!this.isEmpty()) {
      this.elements[0] = lastNode;
      this.bubbleDown(0);
    }
    return rootNode;
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  bubbleUp(index:number) {
    const node = this.elements[index];
    let parent  = this.getParent(index)

    while (this.elements[parent] && node.fScore<this.elements[parent].fScore) {
      this.swap(index,this.getParent(index))
      index = parent
      parent = this.getParent(parent)
    }

    this.map.set(this.elements[index].str,index)

  }

  bubbleDown(index:number) {
    const node = this.elements[index];
    const length = this.elements.length;
    while (index < length) {
      const leftChildIndex =  this.getleftChild(index);
      const rightChildIndex = this.getrightChild(index);
      let swapIndex = null;

      if (leftChildIndex < length) {
        const leftChild = this.elements[leftChildIndex];
        if (leftChild.fScore < node.fScore) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.elements[rightChildIndex];
        if (
          (swapIndex === null && rightChild.fScore < node.fScore) ||
          (swapIndex !== null && rightChild.fScore < this.elements[swapIndex].fScore)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) {
        break;
      }

      this.elements[index] = this.elements[swapIndex];
      index = swapIndex;
    }
    this.elements[index] = node;
  }
  toString(){
    return this.elements.map(Board=> {
      return Board.str + '\n' + Board.fScore 
    }).join();
  }
}

