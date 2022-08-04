
const xClass="x"
let circleFirst;
const circleClass="circle"
const board = document.getElementById("board")
const winningCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let cellElements = document.querySelectorAll('[data-cell]')

function startGame(){
    document.getElementById("winning-message").style.display="none";
    circleFirst = true;
    hoverClass()
    cellElements.forEach((cell)=>{
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.addEventListener('click', handleClick, {once:true})
    })
}

startGame()

function handleClick(e){
   let cell = e.target;
   const currentClass = circleFirst?circleClass:xClass;
   placeMark(cell,currentClass);
   if(checkForWin(currentClass)){
       endGame(true)
   } else if(checkForDraw(currentClass)){
     endGame(false)
   } else{
    switchTurn();
    hoverClass()
   }
   
}

function endGame(winner){
    if(winner){
        document.getElementById("winning-message").style.display="flex";
        document.getElementById("message").innerHTML= `${circleFirst?"O's":"X's"} Winner`;
    }else{
        document.getElementById("winning-message").style.display="flex";
        document.getElementById("message").innerHTML= `Its a Draw`;
    }
}

function placeMark(cell,currentClass){
  cell.classList.add(currentClass);
}

function switchTurn(){
    circleFirst = !circleFirst;
}

function hoverClass(){
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    let currentClass = circleFirst?circleClass:xClass;
    board.classList.add(currentClass)
}

function checkForWin(currentClass){
    return winningCombination.some((combination)=>{
        return combination.every((item)=>{
            return cellElements[item].classList.contains(currentClass)
        })
    })
}

function checkForDraw(){
    return [...cellElements].every((item)=>{
        return item.classList.contains(xClass) || item.classList.contains(circleClass)
    })
}

let restartElement = document.getElementById('restart')

restartElement.addEventListener('click',restartGame)

function restartGame(){
    startGame()
}