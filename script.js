// Wyświetla komunikat
alert("Autor: Oleksandr Shvab")

// Pobiera element div z id board
const board = document.querySelector("#board");

// Tworzenie stałej currentPlayer z zawartością X
let currentPlayer = "X";

// Pobieranie danych od użytkownika
let p1 = prompt("Pierwszy gracz (X)","X")
let p2 = prompt("Drugi gracz (O)","O")

// Tworzenie tablicy z 9 pustymi objaktami
let gameBoard = ["","","","","","","","",""];

let winningCombo = [0,0,0];

// Tworzenie Skieletu gry
function createBoard() {
    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell'); //Dodanie klasy dla cell
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}
function handleCellClick(event) {
    // dodaje klasę dla X
        event.target.classList.add('x-player');

    const messageTur = document.querySelector("#message");// Pobieranie id message dla dalszego wyświetlania wiadomości
    console.log('Cell clicked:', event.target.dataset.index);
    event.target.textContent = currentPlayer;
    gameBoard[event.target.dataset.index] = currentPlayer;
    console.log(checkWin()/* wyłowanie funkcji chakWin*/);

    // Sprawdzenie kko wygrał
    if(checkWin()) {
        messageTur.textContent= `${currentPlayer} wygrał!`;
        console.log(`${currentPlayer} wygrał!`);
        drawWinningLine();
    } else {
    if(currentPlayer === "X") {
        currentPlayer = "O";
        messageTur.textContent = `Tura: ${p2}`//wyświetlanie imiena gracza O
    }
    else {
        currentPlayer = "X";
        messageTur.textContent = `Tura: ${p1}`//wyświetlanie imiena gracza X
        }
        event.target.removeEventListener("click", handleCellClick);
    }
}

createBoard();

// [0,4,8]

//Funkcja chekWin
function checkWin() {
    const winConditions = [
        //Wariacji wygrania
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    //Pętla
    for (const condition of winConditions){
        const [a,b,c] = condition;
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            winningCombo = condition;
            return true;
        }
    }
    
    return false;
}


const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetGame);//Dodanie nasłuchiwaczia zdarzeń

//Funkcja resetowania gry
function resetGame() {
    gameBoard = ["","","","","","","","",""];//Wyczyszczenie gry
    currentPlayer = "X";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {// Pętla forEach()
        cell.textContent = "";
        cell.addEventListener("click", handleCellClick)

        const jestLine = document.querySelector(".line");//Usunięcie linij
        if (jestLine) {
            jestLine.remove();
        }
    });
    document.getElementById("message").textContent = "Tura: X";
    
    
}

resetGame();//Wyłowanie funkcji resetGame()

//Funkcja tworzenia linij
function drawWinningLine() {
    const line = document.createElement("div");
    line.classList.add("line");
    board.appendChild(line);

    const start = winningCombo[0];
    const end = winningCombo[2];

    console.log(winningCombo[0], winningCombo[1], winningCombo[2]);
    console.log(winningCombo);

    //Stylizowanie lnij
    //Pionowe linii
    if (start === 0 && end === 2) {
        line.style.top = "46px";
        line.style.left = "0";
    } else if (start === 3 && end === 5) {
        line.style.top = "151px";
        line.style.left = "0";
    } else if (start === 6 && end === 8) {
        line.style.top = "256px";
        line.style.left = "0";

        //Pożiomowe linie
    } else if (start === 0 && end === 6) {
        line.style.width = "310px";
        line.style.top = "0";
        line.style.left = "53px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 1 && end === 7) {
        line.style.width = "310px";
        line.style.top = "0";
        line.style.left = "158px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 2 && end === 8) {
        line.style.width = "310px";
        line.style.top = "0";
        line.style.left = "263px";
        line.style.transform = "rotate(90deg)";

        //Linie na skos
    } else if (start === 0 && end === 8) {
        line.style.width = "433px";
        line.style.top = "0";
        line.style.left = "3px";
        line.style.transform = "rotate(45deg)";
    } else if (start === 2 && end === 6) {
        line.style.width = "433px";
        line.style.top = "308px";
        line.style.left = "0px";
        line.style.transform = "rotate(-45deg)";
    }
}