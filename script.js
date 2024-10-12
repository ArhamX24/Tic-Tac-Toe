let gameCont = document.querySelector(".game-box");
let boxes = document.querySelectorAll(".box");
let turnTxt = document.querySelector(".turn-text");
let startBtn = document.querySelector(".start");
let resetBtn = document.querySelector(".reset");
let scoreX = document.querySelector(".xscore")
let scoreO = document.querySelector(".oscore")
let superWinner = document.querySelector(".superWinner")
let gamePoint = document.querySelector(".gamePoint")

let arrBoxes = Array.from(boxes)


let winnerAudio = new Audio("Sounds/vicAud.mp3")
let clickAudio = new Audio("Sounds/click12.aac")
let tieAudio = new Audio("Sounds/tie.mp3")
let gameStartAudio = new Audio("Sounds/gamestart.mp3");
let superWinAudio = new Audio("Sounds/superWin.wav")

let turn = "X";
let count = 0;
let Xscore = 0;
let Oscore = 0;
let gameOver = false;

let startBtnClicked = false;

function changeTurn(){
    return turn === "X" ? "O" : "X";
}

function checkWinner(){
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];
    winCombinations.forEach(e =>{
        if(arrBoxes[e[0]].textContent === arrBoxes[e[1]].textContent && arrBoxes
            [e[1]].textContent === arrBoxes[e[2]].textContent && arrBoxes[e[0]].
            textContent !== ""){
            gameOver = true
            winnerAudio.play();
            turnTxt.textContent = `Player ${arrBoxes[e[0]].textContent} wins `
            resetBtn.textContent = 'Game is Starting Again'
            if(arrBoxes[e[0]].textContent == "X" && arrBoxes[e[1]].textContent == "X" && arrBoxes[e[2]].textContent == "X"){
                Xscore++;
                scoreX.textContent = Xscore
                if(Oscore > 2){
                    --Oscore
                    scoreO.textContent = Oscore
                }
            }else{
                Oscore++;
                scoreO.textContent = Oscore
                if(Xscore > 2){
                    --Xscore
                    scoreX.textContent = Xscore
                }
            }
            function scoreChecker(){
                if(Xscore > Oscore){
                    return "X";
                }else{
                    return "O";
                }}
            if(Xscore == 3 || Oscore == 3){
                superWinAudio.play();
                let winner = scoreChecker();
                superWinner.textContent = `${winner} Is Winner Of All`
                scoreX.textContent = 0;
                scoreO.textContent = 0;
                Xscore = 0;
                Oscore = 0;
                setTimeout(()=>{
                    gamePoint.style.display = "none"
                    resetGame()
                },3000)
            }
            console.log(Xscore);
            console.log(Oscore);
            setTimeout(()=>{
                resetGame();
            },3000)
        }
    })
}



function checkTie(){
    if(count == 9){
        tieAudio.play();
        turnTxt.textContent = "It's a tie!";
        gameOver = true;
        resetBtn.textContent = 'Game is Starting Again'
        setTimeout(()=>{
            resetGame();
        },3000)
    }
}

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    resetBtn.style.display = "block"
    gamePoint.style.display = "block"
    gameStartAudio.play();
    turnTxt.textContent = `Player ${turn}'s Turn`;
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                clickAudio.play();
                if (box.textContent === "") {
                    if(!gameOver){
                        box.textContent = turn;
                        turn = changeTurn();
                        turnTxt.textContent = `Player ${turn}'s Turn`
                        count++;
                        checkWinner();
                        checkTie();
                    }
                    // console.log(count);
                }
            });
        });
});

resetBtn.addEventListener("click", () => {
    Xscore = 0;
    Oscore = 0;
    resetGame();
});


function resetGame(){
    superWinner.textContent = ""
    gameStartAudio.play();
    resetBtn.textContent = "Reset"
    turnTxt.textContent = "";
    turn = "X"
    count = 0;
    for(let i =0; i<9; i++){
        boxes[i].textContent = "";
    }
    gameOver = false;
    startBtn.click();
}
