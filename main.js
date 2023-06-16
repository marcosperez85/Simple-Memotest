const $startButton = document.getElementById("start-button");
const $cardContainer = document.querySelector('#card-container');
const $faceDownCard = $cardContainer.querySelectorAll("div");
const $textoFinalContainer = document.getElementById("texto-final-container");
const $finalText1 = document.getElementById("finalText1");
const $finalText2 = document.getElementById("finalText2");
var $initialCard = null;
let turns = 0;

$startButton.onclick = function() {
    showCardContainer();
    hidePreviousResult();
    cardConfiguration();
}

$cardContainer.onclick = function(e) {
    const $element = e.target;
    if($element.classList.contains("faceDown")) {
        handleCardSelection($element);
    }
}

function handleCardSelection($card) {
    turnCardFaceUp($card)

    if($initialCard === null ) {
        $initialCard = $card;
    } else {
        if($initialCard === $card) {
            return;
        }
        turns++

        if(cardsHaveSameNumber($initialCard, $card)) {
            deleteCard($initialCard);
            deleteCard($card);
        } else {
            turnFaceDown($initialCard);
            turnFaceDown($card);
        }
        $initialCard = null;
    } 
    
}

function cardConfiguration() {
    resetCards();
    const finalArray = createArrays();
    mapArrayWithCards(finalArray);
}

function resetCards() {
    for(let i=0; i < $faceDownCard.length; i++) {
        $faceDownCard[i].className = "faceDown cardSize"
    }
}

function showCardContainer() {
    $cardContainer.classList.remove("invisible");
}

function hidePreviousResult() {
    $textoFinalContainer.className = "invisible";
    // $finalText1.className = "invisible";
    // $finalText2.className = "invisible";
    turns = 0;
}

function createArrays() {
    let array1 = fillArray();
    let array2 = fillArray();
    return array1.concat(array2)
}

function fillArray() {
    let obj = [];

    while(obj.length < 6) {
        let numeroAzar = 1 + Math.random() * 6;
        numeroAzar = Math.floor(numeroAzar);
        obj.indexOf(numeroAzar) == -1 ? obj.push(numeroAzar) : "";
    }
    return obj
}

function mapArrayWithCards(arr) {    
    const newArray = arr.map((obj, index) =>
        $faceDownCard[index].textContent = obj
    );     
    
    return newArray
}

function turnCardFaceUp($card) {
    $card.classList.replace("faceDown", "faceUp")
}

function cardsHaveSameNumber(elem1, elem2) {
    return elem1.textContent == elem2.textContent
}

function deleteCard(elem) {
    setTimeout(function() {
        elem.className = "invisible";
        isThisTheEnd();
    }, 1000);
    
}

function turnFaceDown(elem) {
    setTimeout(function() {
        elem.classList.replace("faceUp", "faceDown");
    },1000)
}

function isThisTheEnd() {
    if($cardContainer.querySelectorAll('.faceDown').length === 0) {
        // $finalText1.className = "endGame";
        // $finalText2.className = "endGame";
        $textoFinalContainer.className = "";
        $finalText1.innerHTML = "Terminaste el juego en " + turns + " jugadas";
        $finalText2.innerHTML = "Apretá Start para volver a jugar";
    }
}