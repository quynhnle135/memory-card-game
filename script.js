const cards = document.querySelectorAll(".card");

let cardOne;
let cardTwo;
let matched = 0;
let disableDeck = false;

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
        // If all 8 pairs are matched, shuffle cards to reset
        if (matched === 8) {
            setTimeout(() => {
                return shuffleCards();
            }, 1000);
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

    // Remove shake and flip back for 1s
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
    })
}

shuffleCards();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
