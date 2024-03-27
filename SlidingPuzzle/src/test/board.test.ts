import {describe,test,expect} from "@jest/globals"
import {Board} from "../utils/tile"
import { Solver } from "../utils/solver"
import * as fs from "fs"

//describe('PiorityQueue', () => { 
//	const PQ  = new PriorityQueue()
//	const data = fs.readFileSync('./src/test/testCases/puzzle04.txt', 'utf8')
//	const lines = data.split('\n');
//	const tiles: number[][] = [];
//	for (let i = 1; i <= +lines[0]; i++) {
//		tiles.push(lines[i].trim().split(/\s+/).map(Number))
//	}
//	//const board = new Board(tiles);
//	//PQ.insert(board)
//	//PQ.insert(board.neighbors()[0])
//	//PQ.insert(board.neighbors()[0].neighbors()[1])
//	//PQ.insert(board.neighbors()[0].neighbors()[2])
//	//PQ.insert(board.neighbors()[0].neighbors()[0].neighbors()[1])
//	//PQ.insert(board.neighbors()[0].neighbors()[1].neighbors()[0])
//	//PQ.insert(board.neighbors()[0].neighbors()[1])
//	//PQ.insert(board.neighbors()[1].neighbors()[0].neighbors()[1])
//	//console.log(PQ.toString())
//	//PQ.pop()
//	//PQ.pop()
//	//PQ.pop()
//	//PQ.pop()
//	//console.log(PQ.toString())
// })

describe('Board Module',()=>{

	const data = fs.readFileSync('./src/test/testCases/puzzle04.txt', 'utf8')
	const lines = data.split('\n');
	const tiles: number[][] = [];

	for (let i = 1; i <= +lines[0]; i++) {
		tiles.push(lines[i].trim().split(/\s+/).map(Number))
	}

	const board = new Board(tiles);
	const solver = new Solver(board)

	test('testing board manhattan', () => {
		expect(board.manhattan()).toBe(4)
	})
	test("testing board size", () => {
		expect(board.size()).toBe(+lines[0])
	})
	test("testing board isGoal", () => {
		expect(board.isGoal()).toBe(false)
	})
	test("testing board hamming", () => {
		expect(board.hamming()).toBe(4)
	})
	test("testing board tileFinding", () => {
		expect(board.tileAt(0, 1)).toBe(1)
	})
	test("testing board isSolvable", () => {
		expect(board.isSolvable()).toBe(true)
	})
	test("tesing board neighbors", () => {
		board.neighbors()
	})
	test('sloving all the test cases', () => {
		solver.solve(board)
	})
})
