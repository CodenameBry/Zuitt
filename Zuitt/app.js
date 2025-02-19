console.log("console loaded");
let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

let startX = 0;
let startY = 0;

// a function to set the game board of the tile with the help of updateTile() function to set the looks of the tile
function setGame(){

    // backEndBoard
    board=[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
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
    document.getElementById("score").innerText = score;

    setTimeout(() => {
        if(hasLost()){
            alert("Game Over! You have lost the game. Game will restart") 
            restartGame();
            alert("Click any arrow key to restart")
        }else{
        checkWin();
        }
    }, 100); //delay time in milliseconds
}

document.addEventListener("keydown", handleSlide);

function filterZero(tiles){
    return tiles.filter(num => num !=0);

}
//default function is merging tile to the left

// function slide(tiles){ //function slide([0, 2, 0, 2])

//     // slide function will use filterZero function
//     tiles = filterZero(tiles);
//     console.log(tiles);
//     for(let i = 0; i<tiles.length-1; i++){
//         if(tiles[i] === tiles[i+1]){ // [2, 2]
//             tiles[i] = tiles[i]*2; //[4, 0]
//             tiles[i+1] = 0; //[4, 0]
//             score += tiles[i]; // adds the merged tile to the score
//         }
//     }
//     tiles = filterZero(tiles); //[4]

//     // loop - repeats task
//     while(tiles.length < columns){
//            tiles.push(0) //[4, 0, 0, 0]
//     }
//     return tiles;
// }
function slide(tiles) { // function slide([0,2,0,2])

    // slide function will use filterZero function
     tiles = filterZero(tiles); // [2, 2]
   
     for (let i = 0; i < tiles.length - 1; i++) {
       if (tiles[i] == tiles[i + 1]) { // [2, 2]
         tiles[i] *= 2; // // [4, 2]
         tiles[i + 1] = 0; // [4, 0]
         score += tiles[i]; // adds the merged tile to the score
       }
     }
     tiles = filterZero(tiles); // [4]
   
     // loop (while loop) - repeats task
     while (tiles.length < columns) {
       tiles.push(0); // [4, 0, 0, 0]
     }
     return tiles; // [4, 0, 0, 0]
   }

// function slideLeft(){ 
//     // console.log("sliding to the left");
//     for(let r = 0; r < rows; r++){
//         let row = board[r];
//         originalRow = row.slice(); //documents the original tile before sliding
//         row = slide(row); //slide([0, 2, 0, 2]) -> [4, 0, 0, 0]
//         board[r] = row;

//         for(let c=0; c<columns; c++){
//             let tile = document.getElementById(r.toString() + "-" + c.toString());
//             let num = board[r][c];

//             if(originalRow[c] !== num && num !==0){
//                 tile.style.animation = "slide-from-right 0.3s";
//                 setTimeout(() => {
//                     tile.style.animation = "";
//                 }, 300)
//                 updateTile(tile, num);
//             } 
//         }
//     }
// }

function slideLeft() {
    //   console.log("sliding to the left");
    for (let r = 0; r < rows; r++) {
      let row = board[r];
  
      // line for animation
      originalRow = row.slice(); // documents the original tile before sliding
  
      row = slide(row); // slide([0,2,0,2]) -> [4,0,0,0]
      board[r] = row;
  
      for (let c = 0; c < columns; c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];
  
        // line for animation
        if(originalRow[c] !== num && num !== 0){
          tile.style.animation = "slide-from-right 0.3s";
          setTimeout(() => {
             tile.style.animation = "";
          }, 300);
        }
        updateTile(tile, num);
      }
    }
  }

function slideRight(){
    // console.log("sliding to the right");
    for(let r = 0; r < rows; r++){
        let row = board[r]; //[4, 0, 0, 0]
        originalRow = row.slice(); //documents the original tile
        row.reverse(); //[0, 0, 0, 4]
        row = slide(row);  //[4, 0, 0, 0]
        row.reverse(); //[0, 0, 0, 4]
        board[r] = row;

        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalRow[c] !== num && num !==0){
            tile.style.animation = "slide-from-left 0.3s";
            setTimeout(() =>{
                tile.style.animation = "";
            }, 300);    
            }
            updateTile(tile, num);
        } 
    }
}

function slideUp() {
    // console.log("sliding the tiles upward");
    for (let c = 0; c < columns; c++) {
      let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

      let originalCol = col.slice();
      col = slide(col); 
  
      for (let r = 0; r < rows; r++) {
        board[r][c] = col[r];
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];

        if(originalCol[r] !== num && num !== 0){
            tile.style.animation = "slide-from-bottom 0.3s";
                setTimeout(()=>{
                    tile.style.animation = "";
                },300);
            }
            updateTile(tile, num);
        } 
    }
}

function slideDown(){
    // console.log("sliding the tiles downward");
    for (let c = 0; c < columns; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let originalCol = col.slice();
        col.reverse();
        col = slide(col);
        col.reverse();
    
        for (let r = 0; r < rows; r++) {
          board[r][c] = col[r];
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];

          if(originalCol[r] !== num && num !== 0){
            tile.style.animation = "slide-from-top 0.3s";
                setTimeout(()=>{
                    tile.style.animation = "";
                },300);
            }
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
            else if(board[r][c] == 4096 && is4096Exist == false){
                alert("You are unstoppable at 4096! Fantastic!");
                is4096Exist = true;
            }
            else if(board[r][c] == 8192 && is8192Exist == false){
                alert("You have reached 8192! Awesome!");
                is8192Exist = true;
            }
        }         
    }
}

function hasLost(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            // if the board has an empty tile, false means, the user is not lose yet
            if(board[r][c] === 0){
                return false;
            }
            const currentTile = board[r][c];
            
            // if the board has an same adjecemt tile, false means, the user is not yet lost
            if(
                r > 0 && currentTile === board [r-1][c] || //will check it will has a match to the upper adjacent tile
                r < rows - 1 && currentTile === board [r+1][c] || // will check if it has a match to lower adjacent tile
                c > 0 && currentTile === board [r][c-1] || 
                c < columns-1 && currentTile === board[r][c+1]
            ){
                return false;
            }
        }
// No empty tile, no possible moves left, meaning true, the user hasLost
    }
return true;
}

function restartGame(){
    console.log("Restart Game!")
    // board=[
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ];
    document.getElementById("board").innerHTML = '';
    setGame();

    score = 0;

    setTwo();
}

document.addEventListener("touchstart", (e)=>{
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
})

document.addEventListener("touchend", (e)=>{
    if(!e.target.className.includes("tile")){
        return; //exit the function
    }
    let diffX = startX - e.changedTouches[0].clientX;
    let diffY = startY - e.changedTouches[0].clientY;

    if(diffX !=0 && diffY !==0){
        if(Math.abs(diffX) > Math.abs(diffY)){
            if(diffX > 0){
                slideLeft();
                setTwo();
            }
            else{
                slideRight();
                setTwo();
            }
        }
        else{
            if(diffY > 0){
            slideUp();
            setTwo();
            }
            else{
                slideDown();
                setTwo(); 
            }
        }
    }
})