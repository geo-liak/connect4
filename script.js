document.body.innerHTML += "\n\n<!-- Code generated with JS -->\n\n";


let player1 = prompt("Please enter the name of player 1 (red):")
let player2 = prompt("Please enter the name of player 2 (yellow):")

let redPlayer = true;

createStructure();

function createStructure() {
    let divGame = document.createElement("div");
    divGame.setAttribute("id", "game");
    divGame.setAttribute("class", "column-container")
    document.body.appendChild(divGame);


    let divInfo = document.createElement("div");
    divInfo.setAttribute("id", "info");
    divInfo.setAttribute("class", "column-container")
    document.body.appendChild(divInfo);
    document.getElementById("game").innerHTML += "\n\n"

    let infoBox = document.createElement("div");
    infoBox.setAttribute("id", "infoBox");
    infoBox.setAttribute("class", "information-box");
    document.getElementById("info").appendChild(infoBox);
    document.getElementById("infoBox").innerText = "Player Information";


    // We need 7 columns and 6 rows.
    for (var column = 1; column <= 7; column++) {
        var idName = "col" + column;
        var divColumn = document.createElement("div");
        divColumn.setAttribute("id", idName);
        divColumn.setAttribute("class", "column-container")
        document.getElementById("game").appendChild(divColumn);
        // document.body.appendChild(divColumn);
        document.getElementById(idName).innerHTML += "\n";

        for (var row = 1; row <= 6; row++) {


            var idSquare = "R" + row + "C" + column + "-square";
            var divSquare = document.createElement("div");
            divSquare.setAttribute("id", idSquare);
            divSquare.setAttribute("class", "square");
            document.getElementById(idName).appendChild(divSquare);
            document.getElementById(idName).innerHTML += "\n";

            var idCircle = "R" + row + "C" + column + "-circle";
            var divCircle = document.createElement("div");
            divCircle.setAttribute("class", "circle");
            divCircle.setAttribute("id", idCircle);
            document.getElementById(idSquare).appendChild(divCircle);

        }

        document.body.innerHTML += "\n\n";
    }

    // console.log(document.body.innerHTML);
}


document.addEventListener("click", function (e) {
    let clickedElementId = e.target.getAttribute("id");
    console.clear();
    console.log("clicked on: " + clickedElementId);
    let playedElementId;

    for (let i = 6; i > 0; i--) {
        let item = "R" + i + "C" + clickedElementId.substring(3, 4) + "-circle";

        if (document.getElementById(item).classList.contains("yellow") || document.getElementById(item).classList.contains("red")) {
            continue;
        } else {
            if (redPlayer) {
                document.getElementById(item).classList.add("red");
            } else {
                document.getElementById(item).classList.add("yellow");
            }
            redPlayer = !redPlayer;
            playedElementId = "R" + i + "C" + clickedElementId.substring(3, 4) + "-circle";
            break;
        }

    }
    checkWinner(playedElementId);
})



function checkWinner(playedElementId) {
    let col, row, minCol, maxCol, minRow, maxRow, color;
    console.log("played on: " + playedElementId);

    function calculateInitialMinimumAndMaximumValues() {
        col = parseInt(playedElementId.substring(3, 4));
        row = parseInt(playedElementId.substring(1, 2));
        minCol = col - 3;
        maxCol = col + 3;
        minRow = row - 3;
        maxRow = row + 3;
        // console.log("Min & Max values before check: \ncol: " + col + ", min: " + minCol + ", max: " + maxCol +
        //     "\nrow: " + row + ", min: " + minRow + ", max: " + maxRow);

        if (minCol < 1) {
            minCol = 1;
        }

        if (maxCol > 7) {
            maxCol = 7;
        }

        if (minRow < 1) {
            minRow = 1
        }

        if (maxRow > 6) {
            maxRow = 6
        }
        console.log("Min & Max values after check: \ncol: " + col + ", min: " + minCol + ", max: " + maxCol +
            "\nrow: " + row + ", min: " + minRow + ", max: " + maxRow);

        color;

        // the value of redPlayer has already been changed.
        // We want to find the player who just made a move, so we take the opposite value.
        if (redPlayer == false) {
            color = "red";
        } else {
            color = "yellow";
        }

    }

    calculateInitialMinimumAndMaximumValues();
    checkHorizontal();
    checkVertical();
    checkDiagonalLR();
    checkDiagonalRL();

    // Check row if there is winning match
    function checkHorizontal() {
        for (let i = minCol; i <= maxCol; i++) {
            // We must assure that every time no less than 4 consequent elements will be checked.
            // That is why we perform the check if (maxCol - i) > 2.
            if ((maxCol - i) > 2) {
                let item1 = document.getElementById(playedElementId.substring(0, 3) + i + playedElementId.substring(4)).classList.contains(color);
                let item2 = document.getElementById(playedElementId.substring(0, 3) + (i + 1) + playedElementId.substring(4)).classList.contains(color);
                let item3 = document.getElementById(playedElementId.substring(0, 3) + (i + 2) + playedElementId.substring(4)).classList.contains(color);
                let item4 = document.getElementById(playedElementId.substring(0, 3) + (i + 3) + playedElementId.substring(4)).classList.contains(color);

                if (item1 && item2 && item3 && item4 == true) {
                    alert("We have winner");
                }
            } else {
                break;
            }
        }
    }

    // Check column if there is winning match
    function checkVertical() {
        for (let i = minRow; i <= maxRow; i++) {
            if ((maxRow - i) > 2) {
                let item1 = document.getElementById("R" + i + playedElementId.substring(2)).classList.contains(color);
                let item2 = document.getElementById("R" + (i + 1) + playedElementId.substring(2)).classList.contains(color);
                let item3 = document.getElementById("R" + (i + 2) + playedElementId.substring(2)).classList.contains(color);
                let item4 = document.getElementById("R" + (i + 3) + playedElementId.substring(2)).classList.contains(color);

                if (item1 && item2 && item3 && item4 == true) {
                    alert("We have winner");
                }
            } else {
                break;
            }
        }

    }


    // Check diagonal (LR:: direction from top left to bottom right) if there is winning match
    function checkDiagonalLR() {


        calculateInitialMinimumAndMaximumValues();

        if ((row - minRow) < (col - minCol)) {
            minCol = col - (row - minRow);
        } else {
            minRow = row - (col - minCol);
        }

        if ((maxRow - row) < (maxCol - col)) {
            maxCol = col + (maxRow - row);
        } else {
            maxRow = row + (maxCol - col);
        }

        let diagonalPieces = (maxRow - minRow) + 1;

        console.log("minRow: " + minRow);
        console.log("minCol: " + minCol);
        for (let i = 0; i <= diagonalPieces; i++) {
            if ((diagonalPieces - i) > 3) {

                let item1 = document.getElementById("R" + (minRow + i) + "C" + (minCol + i) + "-circle").classList.contains(color);
                let item2 = document.getElementById("R" + (minRow + i + 1) + "C" + (minCol + i + 1) + "-circle").classList.contains(color);
                let item3 = document.getElementById("R" + (minRow + i + 2) + "C" + (minCol + i + 2) + "-circle").classList.contains(color);
                let item4 = document.getElementById("R" + (minRow + i + 3) + "C" + (minCol + i + 3) + "-circle").classList.contains(color);


                console.log("After Adjustment!");
                console.log("minRow: " + minRow + ", maxCol: " + maxCol + " (R" + minRow + "C" + minCol + ")");
                console.log("maxRow: " + maxRow + ", minCol: " + minCol + " (R" + maxRow + "C" + maxCol + ")");
                console.log("R" + (minRow + i) + "C" + (minCol + i) + "-circle");
                console.log("R" + (minRow + i + 1) + "C" + (minCol + i + 1) + "-circle");
                console.log("R" + (minRow + i + 2) + "C" + (minCol + i + 2) + "-circle");
                console.log("R" + (minRow + i + 3) + "C" + (minCol + i + 3) + "-circle");
                console.log(item1 + " " + item2 + " " + item3 + " " + item4);

                if (item1 && item2 && item3 && item4 == true) {
                    alert("We have winner");
                }
            }
        }
    }


    // Check diagonal (direction from top right to bottom left) if there is winning match
    function checkDiagonalRL() {

        calculateInitialMinimumAndMaximumValues();

        if ((maxRow - row) < (col - minCol)) {
            minCol = col - (maxRow - row);
        } else {
            maxRow = row + (col - minCol);
        }

        if ((row - minRow) < (maxCol - col)) {
            maxCol = col + (row - minRow);
        } else {
            minRow = row - (maxCol - col);
        }

        // diagonalPieces refers to the total number of checkers that can be found on the diagonal
        // and could be part of the winning combination. Only one can be found on each column.
        // It is used to ensure that all combinations checked consist of no less than 4 checkers.
        diagonalPieces = (maxCol - minCol) + 1;

        for (let i = 0; i <= diagonalPieces; i++) {
            if ((diagonalPieces - i) > 3) {
                let item1 = (document.getElementById("R" + (minRow + i) + "C" + (maxCol - i) + "-circle").classList.contains(color));
                let item2 = (document.getElementById("R" + (minRow + i + 1) + "C" + (maxCol - i - 1) + "-circle").classList.contains(color));
                let item3 = (document.getElementById("R" + (minRow + i + 2) + "C" + (maxCol - i - 2) + "-circle").classList.contains(color));
                let item4 = (document.getElementById("R" + (minRow + i + 3) + "C" + (maxCol - i - 3) + "-circle").classList.contains(color));
                console.log("After Adjustment!");
                console.log("minRow: " + minRow + ", maxCol: " + maxCol + " (R" + minRow + "C" + maxCol + ")");
                console.log("maxRow: " + maxRow + ", minCol: " + minCol + " (R" + maxRow + "C" + minCol + ")");
                console.log("R" + (minRow + i) + "C" + (maxCol - i) + "-circle");
                console.log("R" + (minRow + i + 1) + "C" + (maxCol - i - 1) + "-circle");
                console.log("R" + (minRow + i + 2) + "C" + (maxCol - i - 2) + "-circle");
                console.log("R" + (minRow + i + 3) + "C" + (maxCol - i - 3) + "-circle");
                console.log(item1 + " " + item2 + " " + item3 + " " + item4);
                if (item1 && item2 && item3 && item4 === true) {
                    alert("We have winner");
                }
            }
        }
    }
}