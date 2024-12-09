const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//link text
playerLivesCount.textContent = playerLives;

//generate the data
const getData = () => [
    
    { imgSrc: "./images/blue.jpg", name: "blue"}, 
    { imgSrc: "./images/green.jpg", name: "green"},
    { imgSrc: "./images/indigo.jpg", name: "indigo"},
    { imgSrc: "./images/orange.jpg", name: "orange"},
    { imgSrc: "./images/pink.jpg", name: "pink"},
    { imgSrc: "./images/purple.jpg", name: "purple"},
    { imgSrc: "./images/red.jpg", name: "red"},
    { imgSrc: "./images/yellow.jpg", name: "yellow"},
    { imgSrc: "./images/blue.jpg", name: "blue"}, 
    { imgSrc: "./images/green.jpg", name: "green"},
    { imgSrc: "./images/indigo.jpg", name: "indigo"},
    { imgSrc: "./images/orange.jpg", name: "orange"},
    { imgSrc: "./images/pink.jpg", name: "pink"},
    { imgSrc: "./images/purple.jpg", name: "purple"},
    { imgSrc: "./images/red.jpg", name: "red"},
    { imgSrc: "./images/yellow.jpg", name: "yellow"},
];

//function to randomize

const randomize = () => {
    const cardData = getData();
    cardData.sort( () => Math.random() - 0.5);
    return cardData;
};

// card generator function
const cardGenerator = () => {
    const cardData = randomize ();

    //generate the html
   
    cardData.forEach( (item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        //attach info for cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);



        //attach cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
      
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
      });
    };


//check cards

const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
     console.log(clickedCard);

    //logic

    if(flippedCards.length === 2) {
        if(
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
        ) {
            console.log("match");
            flippedCards.forEach (card => {
                card.classList.remove("flipped");
               card.style.pointerEvents = "none";
            });
        } else {
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0) {
                restart("sorry. try again");
            }
        }
    }
    if(toggleCard.length === 16){
        restart("you won!🌈");
    }
};

//restart
const restart = (text) => {
    let cardData = randomize ();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerevents = "none" ;
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");

        // randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
        }, 1000);    
    });
    playerLives = 6
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();



