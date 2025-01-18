let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// a function to set the game board of the tile with the help of updateTile() function to set the looks of the tile
function setGame(){

    // backEndBoard
    board=[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 2048, 2048, 0],
        [0, 0, 0, 0],
    ];
    // loop (for loop) - repeat task
    for(let r = 0; r<rows; r++){
        for(let c=0; c<columns; c++){
            // Create  div element for tiles
            let tile = document.createElement("div");
            // we dded an id to tile based on its seat position (r and c)
            tile.id = r.toString() + "-" + c.toString();
            // we retrieve the number of the tile from our baackend board
            let num = board[r][c];

            updateTile(tile,num);//clls the update tile function
            // the tile element (div) and the number inside the tile will be used to update the looks or display of the tile
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}
// responsible to update the looks of the tile
function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    // <div class="tile"> </div>
    tile.classList.add("tile");

    // display the number of the tile to the element
	if(num > 0){
		tile.innerText = num.toString();
        
		if(num <= 4096){
			tile.classList.add("x"+ num.toString());
            // <div class="tile x2"></div>
		}
		else{
			tile.classList.add("x8192");
            // <div class="tile x8192"></div>
		}
	}
}
window.onload = function(){
setGame();
}

function handleSlide(e){
    // code represents the key being pressed during the event
    console.log(e.code);

    e.preventDefault();

    if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes (e.code)){

    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
}
setTimeout(() => {
    checkWin();
}, 100); //delay time in milliseconds
}

document.addEventListener("keydown", handleSlide);

function filterZero(tiles){
    return tiles.filter(num=>num!=0);

}
//default function is merging tile to the left
function slide(tiles){ //function slide([0, 2, 0, 2])

    // slide function will use filterZero function
    tiles = filterZero(tiles);
    
    for(let i = 0; i<tiles.length-1; i++){
        if(tiles[i] == tiles [i+1]){ // [2, 2]
            tiles [i] *= 2; //[4, 0]
            tiles[i+1] = 0; //[4, 0]
            score += tiles[i];
        }
    }
    tiles = filterZero(tiles); //[4]

    // loop - repeats task
    while(tiles.length < columns){
           tiles.push(0) //[4, 0, 0, 0]
    }
    return tiles;
}
function slideLeft(){ 
    // console.log("sliding to the left");
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row); //slide([0, 2, 0, 2]) -> [4, 0, 0, 0]
        board[r] = row;

        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    // console.log("sliding to the right");
    for(let r = 0; r < rows; r++){
        let row = board[r]; //[4, 0, 0, 0]
        row.reverse(); //[0, 0, 0, 4]
        row = slide(row);  //[4, 0, 0, 0]
        row.reverse(); //[0, 0, 0, 4]
        board[r] = row;

        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    // console.log("sliding the tiles upward");
    for (let c = 0; c < columns; c++) {
      let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
      col = slide(col); 
  
      for (let r = 0; r < rows; r++) {
        board[r][c] = col[r];
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];
        updateTile(tile, num);
        }
    }
}

function slideDown(){
    // console.log("sliding the tiles downward");
    for (let c = 0; c < columns; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        col.reverse();
        col = slide(col);
        col.reverse();
    
        for (let r = 0; r < rows; r++) {
          board[r][c] = col[r];
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
          }
      }
}




function hasEmptyTile(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }  
    return false;
}


function setTwo(){
    console.log(hasEmptyTile())
    if(hasEmptyTile() == false){
        return;
    }

    let found = false;

    while(!found){
        let r = Math.floor(Math.random()* rows);
        let c = Math.floor(Math.random()* columns);

        if(board[r][c]==0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString()+ "-" + c.toString());
            tile.innerText= "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function checkWin(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if(board[r][c] == 2048 && is2048Exist == false){
                alert("You Win! You got the 2048");
                is2048Exist = true;
            }
            else if(board[r][c] == 4098 && is4098Exist == false){
                alert("You are unstoppable at 4096! Fantastic!");
                is4098Exist = true;
            }
            else if(board[r][c] == 8192 && is8192Exist == false){
                alert("You have reached 8192! Awesome!");
                is8192Exist = true;
        }
    }         
}
}