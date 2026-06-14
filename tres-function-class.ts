/**
 * 3 functions
 * 1. shift numbers
 * 2. merge numbers
 * 
 * pseudo example
 * i have an array, random spawn in random [i]. ( omit this )
 * I need to merge whatever is next to it depending on..
 * then move all the numbers towards the location, 
 * checks: is it the same value? able to combine?
 * [ 0, 2, 2, 0, 0] => I call > ( right ) 
 * [ 0, 0, 4, 0, 0] => arr[1] value = arr[2] -> branch, if same -> return *2 value onto
 * the right value ( because i called right ), the left value becomes 0 
 * [ 0, 0, 0, 0, 4] => indexing, it will keep moving to [i++] if the value is 0.
 * 
 * complications
 * [ 0, 0, 4, 2, 0] => scanning from right might mess me up. if i call the right function,
 * maybe i should scan from [i--], or still do [i++] but move the furthest index value first, 
 * and convert to 0.
 * 
 * or how about move -> scan -> move -> scan...
 * would that be a bad code?
 * 
 * my task for the 3 functions that i have to make
 * 2-3 arrays of lets say index of 5 both for testing.
 * 
 * 
 * 
 *
 */

const numArray0: number[] = [0, 0, 0, 0]; // t his has to end on [0,0,0,0,4]
const numArray1: number[] = [0, 0, 0, 0]; // this has to end on [ 0, 0, 4, 0, 0] => [0, 0, 0, 0, 4]
const numArray2: number[] = [0, 0, 0, 0]; // this has to end on [ 0, 0, 0, 4, 2]
const numArray3: number[] = [0, 0, 0, 0]; // this has to end on [ 0, 0, 0, 8, 8]|
const numArray4: number[] = [0, 0, 0, 0]; // this has to end on [ 0, 0, 0, 4, 4]

function boardMerge(arrOne: number[], arrTwo: number[], arrThree: number[], arrFour: number[]): number[][]{
    const mergedArr: number[][] = [arrOne, arrTwo, arrThree, arrFour, arrFive];
    return mergedArr;
}


class Game2048 {
    public gameOver: boolean = false;
    public mergedArr: number[][] = [numArray0, numArray1, numArray2, numArray3, numArray4];
    constructor() {
        spawnTiles(this.mergedArr);
        spawnTiles(this.mergedArr);
        renderBoard(this.mergedArr);


/*            if (spawnTiles(this.mergedArr) === true) {
                console.log("Game ended.");
                this.gameOver = true;
*/           // }

                
                const readline = require("readline");
                readline.emitKeypressEvents(process.stdin);
                if (process.stdin.isTTY) process.stdin.setRawMode(true);
                
                process.stdin.on("keypress", (str, key) => { // doesnt need this.mergedArr = blah() bcuz its a mutation.
                    if (this.gameOver) return;
                    if (key.ctrl && key.name === 'c') process.exit();
                    renderBoard(this.mergedArr);


                    if (key.name === 'w') {
                        boardMergeUp(this.mergedArr);
                        boardShiftDown(this.mergedArr);
                        spawnTiles(this.mergedArr);                        
                    }
                    if (key.name === 'a') {
                        reverseTiles(this.mergedArr);
                        boardMergeLeft(this.mergedArr);
                        boardShiftLeft(this.mergedArr);
                        reverseTiles(this.mergedArr);
                        spawnTiles(this.mergedArr);
                    }
                    if (key.name === 's') {
                        reverseTiles(this.mergedArr);
                        transpose(this.mergedArr);
                        boardMergeDown(this.mergedArr);
                        boardShiftDown(this.mergedArr);
                        reverseTiles(this.mergedArr);
                        transpose(this.mergedArr);
                        spawnTiles(this.mergedArr);                        
                    }
                    if (key.name === 'd') {
                        transpose(this.mergedArr);
                        boardMergeRight(this.mergedArr);
                        boardShiftRight(this.mergedArr);
                        transpose(this.mergedArr);
                        spawnTiles(this.mergedArr);
                    }
                });
        }
    }


const game = new Game2048();

function renderBoard(arr: number[][]): void {
    console.log("Current board state:");
    console.log(arr.map(row => row.join(' ')).join('\n'));
    console.log("-----------");
}

function spawnTiles(arr: number[][]): number[][] | boolean { 
    //on a board, i need to find all zeroes ( aka empty tile )
    let emptyTiles: [number, number][] =[];
    //to find all zeroes i need to to know which positions are zeroes.
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            if (arr[i][j] === 0) emptyTiles.push([i, j]); //empty tiles takes [number, number].
        }
    } 
    if (emptyTiles.length === 0) return true; //nothing in the emptytiles = meaning everything has a value. returns gameover.
    const idx = Math.floor(Math.random() * emptyTiles.length); //between all empty tiles, i choose one.
    const [r, k] = emptyTiles[idx];
    arr[r][k] = 2;
    return arr;
}

function reverseTiles(arr: number[][]): number[][]{
    return arr.reverse();
}

function transpose(arr: number[][]): number[][]{
    //relearning transpose i need arr[i][j] to be arr[j][i]
    const transposed: number[][] = [];
    for (let l = 0; l < arr.length; l++){
        transposed.push([]);
    }
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            transposed[j][i] = arr[i][j];
        }
    }return transposed;
}

function mergeRight(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--){
        if (arr[i] !== 0){ // current array is not zero
            for (let j = 1; j <= i; j++ ){ //i need J to keep going up till i - j <= 0
                if (arr[i-j] !== 0){ // check if next value is not a zero
                if(arr[i] === arr[i - j]){
                    arr[i] *= 2; // then current array becomes *2 of original
                    arr[i - j] = 0; // and the next array on the LEFT becomes zero, because it merged.
                }else{
                    break;
                }
                }
            }
        }else{
            continue; // back to the top if its 0 
        }
    }
    return shiftRight(arr);
}
// to words: i need to figure out of the value which is 2. and the value next in line i-1 is same, if not i-2 if not i-3... 

// to go from left or right? if i start from right i can confirm if or if not value on furthest and find the 0
// if i start from left to right, i can basically scoot value over to right, but if both values are together, i'd scan again.
// i think ill start from right, same principal as mergeRight swapping.
// swap swap swap. swap, how about next value? if zero swap. how about next value? if zero swap...
function shiftRight(arr: number[]): number[] {
    for (let i = arr.length - 1; i >= 0; i--){  // >= 0 to count 0 too
        if (arr[i] === 0){ //does this array have a value?
            for (let j = i - 1; j >= 0; j--){ // find the left side, j needs to be more than or 0, j decreases.
                if (arr[j] !== 0){
                    arr[i] = arr[j];
                    arr[j] = 0; //the one with value becomes 0.
                    break;
                }
            }
        }else{
            continue; // this array is zero, continue the for loop.

        }

    }return arr;
}

function boardMergeRight(arr: number[][]): number[][] {
    for (let i = arr.length - 1; i >= 0; i--){  // length is 4
        for (let j = arr[i].length - 1; j >= 0; j--){ // [i].length is 4
            if (arr[i][j] !== 0){ // if 0,0 is NOT 0 -> check the value.
                for (let k = 1; k <= j; k++){ // less than equals to j which is the actual value of the arr
                    if (arr[i][j-k] !==0){
                        if (arr[i][j] === arr[i][j-k]){
                            arr[i][j] *= 2;
                            arr[i][j-k] = 0;
                            break;
                        }else{
                            break;
                        }
                    }
                }
            }else{
                continue;
            }
        }
    }return arr;
}

function boardShiftRight(arr: number[][]): number[][]{ //magic function
    for (let i = arr.length - 1; i >= 0; i--){
        for (let j = arr[i].length - 1; j >= 0; j--){
            if (arr[i][j] === 0){
                for (let r = j - 1; r >= 0; r--){
                    if (arr[i][r] !== 0){
                        arr[i][j] = arr[i][r];
                        arr[i][r] = 0;
                        break;
                    }
                }

            }else{
                continue;
            }
        }
    }
    return arr; 
}

function boardMergeLeft(arr: number[][]): number[][] {
    for (let i = arr.length - 1; i >= 0; i--){  // length is 4
        for (let j = arr[i].length - 1; j >= 0; j--){ // [i].length is 4
            if (arr[i][j] !== 0){ // if 0,0 is NOT 0 -> check the value.
                for (let k = 1; k <= j; k++){ // less than equals to j which is the actual value of the arr
                    if (arr[i][j-k] !==0){
                        if (arr[i][j] === arr[i][j-k]){
                            arr[i][j] *= 2;
                            arr[i][j-k] = 0;
                            break;
                        }else{
                            break;
                        }
                    }
                }
            }else{
                continue;
            }
        }
    }return arr;
}

function boardShiftLeft(arr: number[][]): number[][]{ //magic function
    for (let i = arr.length - 1; i >= 0; i--){
        for (let j = arr[i].length - 1; j >= 0; j--){
            if (arr[i][j] === 0){
                for (let r = j - 1; r >= 0; r--){
                    if (arr[i][r] !== 0){
                        arr[i][j] = arr[i][r];
                        arr[i][r] = 0;
                        break;
                    }
                }

            }else{
                continue;
            }
        }
    }
    return arr; 
}

function boardMergeUp(arr: number[][]): number[][] {
    for (let i = arr.length - 1; i >= 0; i--){  // length is 4
        for (let j = arr[i].length - 1; j >= 0; j--){ // [i].length is 4
            if (arr[i][j] !== 0){ // if 0,0 is NOT 0 -> check the value.
                for (let k = 1; k <= j; k++){ // less than equals to j which is the actual value of the arr
                    if (arr[i][j-k] !==0){
                        if (arr[i][j] === arr[i][j-k]){
                            arr[i][j] *= 2;
                            arr[i][j-k] = 0;
                            break;
                        }else{
                            break;
                        }
                    }
                }
            }else{
                continue;
            }
        }
    }return arr;
}

function boardShiftUp(arr: number[][]): number[][]{ //magic function
    for (let i = arr.length - 1; i >= 0; i--){
        for (let j = arr[i].length - 1; j >= 0; j--){
            if (arr[i][j] === 0){
                for (let r = j - 1; r >= 0; r--){
                    if (arr[i][r] !== 0){
                        arr[i][j] = arr[i][r];
                        arr[i][r] = 0;
                        break;
                    }
                }

            }else{
                continue;
            }
        }
    }
    return arr; 
}

function boardMergeDown(arr: number[][]): number[][] {
    for (let i = arr.length - 1; i >= 0; i--){  // length is 4
        for (let j = arr[i].length - 1; j >= 0; j--){ // [i].length is 4
            if (arr[i][j] !== 0){ // if 0,0 is NOT 0 -> check the value.
                for (let k = 1; k <= j; k++){ // less than equals to j which is the actual value of the arr
                    if (arr[i][j-k] !==0){
                        if (arr[i][j] === arr[i][j-k]){
                            arr[i][j] *= 2;
                            arr[i][j-k] = 0;
                            break;
                        }else{
                            break;
                        }
                    }
                }
            }else{
                continue;
            }
        }
    }return arr;
}

function boardShiftDown(arr: number[][]): number[][]{ //magic function
    for (let i = arr.length - 1; i >= 0; i--){
        for (let j = arr[i].length - 1; j >= 0; j--){
            if (arr[i][j] === 0){
                for (let r = j - 1; r >= 0; r--){
                    if (arr[i][r] !== 0){
                        arr[i][j] = arr[i][r];
                        arr[i][r] = 0;
                        break;
                    }
                }

            }else{
                continue;
            }
        }
    }
    return arr; 
}