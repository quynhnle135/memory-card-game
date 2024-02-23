const cards = document.querySelectorAll(".card");

let cardOne;
let cardTwo;
let matched = 0;
let disableDeck = false;

let startingTime = 20;
let intervalID;
let seconds;
let win = false;
// Win-Lose Modal
const win_play_again = document.getElementById("win-play-again");
const lose_play_again = document.getElementById("lose-play-again");
const modal_container = document.getElementById("modal-container");

// Lose Modal
const win_modal_container = document.getElementById("modal-cotainer");
const lose_modal_container = document.getElementById("lose-modal-container");

// Reset button
const reset = document.getElementById("reset-button");
reset.addEventListener("click", () => {
    shuffleCards();
});

// Win Play Again button
win_play_again.addEventListener("click", () => {
    modal_container.classList.remove("show");
    shuffleCards();
});

lose_play_again.addEventListener("click", () => {
    lose_modal_container.classList.remove("show");
    shuffleCards();
})

function startTimer() {
    clearInterval(intervalID); // Clear existing running timer
    startingTime = 30;
    seconds = startingTime;
    intervalID = setInterval(countdownTimer, 1000);
}

function countdownTimer() {
    let timer = document.getElementById("timer");
    timer.innerText = `Timer: ${seconds}`;
    seconds--;
    if (seconds < 0) {
        clearInterval(intervalID);
        endRound();
    } 
}

function endRound() {
    if (matched !== 8) {
        lose_modal_container.classList.add("show");
    }
}

function flipCard({target: clickedCard}) {
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        // If all 8 pairs are matched, pop up win modal
        if (matched === 8) {
            clearInterval(intervalID);
            setTimeout(() => {
                modal_container.classList.add("show");
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = "";
        cardTwo = "";
        return disableDeck = false;
    }

    // If not matched, shake for 0.4s
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Remove shake and flip back in 0.8s
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = "";
        cardTwo = "";
        disableDeck = false;
    }, 800);
}
       
function shuffleCards() {
    matched = 0;
    cardOne = "";
    cardTwo = "";
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `img/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
    startTimer();
}

shuffleCards();
startTimer();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
