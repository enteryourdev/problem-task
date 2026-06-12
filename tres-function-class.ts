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

const numArray0: number[] = [0, 0, 0, 0, 0]; // t his has to end on [0,0,0,0,4]
const numArray1: number[] = [0, 0, 0, 0, 0]; // this has to end on [ 0, 0, 4, 0, 0] => [0, 0, 0, 0, 4]
const numArray2: number[] = [0, 0, 0, 0, 0]; // this has to end on [ 0, 0, 0, 4, 2]
const numArray3: number[] = [0, 0, 0, 0, 0]; // this has to end on [ 0, 0, 0, 8, 8]|
const numArray4: number[] = [0, 0, 0, 0, 0]; // this has to end on [ 0, 0, 0, 4, 4]


const readline = require("readline");

readline.emitKeypressEvents(process.stdin);
readline.setRawMode(true);

class Game2048 {
    public gameOver: boolean = false;
    public mergedArr: number[][] = [numArray0, numArray1, numArray2, numArray3, numArray4];
    constructor() {
        spawnTiles(this.mergedArr);
        spawnTiles(this.mergedArr);
        while (!this.gameOver){
            if (spawnTiles(this.mergedArr) === true) {
                console.log("Game ended.");
                this.gameOver = true;
        }
        }

    }

}

const game = new Game2048();

function spawnTiles(arr: number[][]): number[][] | boolean { // while there is unoccupied or 0 tile, does 0 exist?, if it does
    let hasZero = false;
    while (hasZero === false){
        const i = Math.floor(Math.random() * arr.length); // math random 0 ~ 0.99.
        const j = Math.floor(Math.random() * arr[i].length);
        if (arr[i][j] === 0){
            hasZero = true;
            arr[i][j] = 2;
            return arr;
        }else{
            continue;
        }
    }return true;
}

process.stdin.on("keypress", (str, key) => {
    if (key.name === 'w') {

    }
    if (key.name === 'a') {

    }
    if (key.name === 's') {

    }
    if (key.name === 'd') {

    }
    if (key.ctrl && key.name === 'c') process.exit();
});

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

function boardScanner(arrOne: number[], arrTwo: number[], arrThree: number[], arrFour: number[], arrFive: number[]): number[][]{
    const mergedArr: number[][] = [arrOne, arrTwo, arrThree, arrFour, arrFive];
    //readd scans
    return mergedArr;
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
    }return boardShiftRight(arr);
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