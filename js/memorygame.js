"use strict";
// this is the array that contains all my images
var memoryGame={};
  memoryGame.arrImages = [
    {name: "baby1", src: "./images/puki1.jpg"},
    {name: "baby2", src: "./images/puki1.jpg"},
    {name: "baby3", src: "./images/puki7.jpg"},
    {name: "baby4", src: "./images/puki7.jpg"},
    {name: "baby5", src: "./images/puki3.jpg"},
    {name: "baby6", src: "./images/puki3.jpg"},
    {name: "baby7", src: "./images/puki4.jpg"},
    {name: "baby8", src: "./images/puki4.jpg"},
    {name: "baby9", src: "./images/puki8.jpg"},
    {name: "baby10", src: "./images/puki8.jpg"},
    {name: "baby11", src: "./images/puki6.jpg"},
    {name: "baby12", src: "./images/puki6.jpg"},
    {name: "baby13", src: "./images/puki9.PNG"},
    {name: "baby14", src: "./images/puki9.PNG"},
    {name: "baby15", src: "./images/puki20.jpg"},
    {name: "baby16", src: "./images/puki20.jpg"},
    {name: "baby17", src: "./images/puki11.jpg"},
    {name: "baby18", src: "./images/puki11.jpg"},
    {name: "baby19", src: "./images/puki21.jpg"},
    {name: "baby20", src: "./images/puki21.jpg"},
    {name: "baby21", src: "./images/puki16.jpg"},
    {name: "baby22", src: "./images/puki16.jpg"},
    {name: "baby23", src: "./images/puki17.jpg"},
    {name: "baby24", src: "./images/puki17.jpg"}
];


memoryGame.RightAnswerMemory = [];   //array that will contain the images once they were found
memoryGame.tileFliped = 0; //counts the number of tiles that were fliped
memoryGame.FirstCard = []; //saves the first card that was fliped
memoryGame.SecondCard = []; // saves the second  that was fliped
memoryGame.nTile = 0; // in order to randomize the number of cards according to the level i need to save the number of tiles
memoryGame.colTile = 0; //how many colomns of tiles i wil have
memoryGame.rowTile = 0; // how many rows i will have according to the tiles
memoryGame.gamePaused = false; //in order to pause the game while the setTimeOut function works
memoryGame.countWrongAnswers = 0; //to count the number of wrong answers




//function that loads the Game according to the level selected by the player

memoryGame.loadCards=function() {

    memoryGame.RightAnswerMemory = [];
    memoryGame.tileFliped = 0;
    memoryGame.FirstCard = [];
    memoryGame.SecondCard = [];
    memoryGame.colTile = 0;
    memoryGame.rowTile = 0;
    memoryGame.gamePaused = false;
    memoryGame.countWrongAnswers = 0;
    memoryGame.nTile = 0;
    document.getElementById("level").style.visibility="visible";
    document.getElementById('message').innerHTML=" ";
    document.querySelector('.answer#lightbox').style.display = "none";
    var numTile = document.getElementsByClassName("length");
    document.getElementById('game').innerHTML = "";
    for (var i = 0; i < numTile.length; i++) {
        var btn = numTile[i];
        if (btn.checked) {
            memoryGame.nTile = parseInt(btn.value);
           
        }

    }
    switch (memoryGame.nTile) {
        case 12:
            memoryGame.colTile = 4;
            memoryGame.rowTile = 3;
            break;
        case 18:
            memoryGame.colTile = 6;
            memoryGame.rowTile = 3;
            break;
        case 24:
            memoryGame.colTile = 6;
            memoryGame.rowTile = 4;
            break;
    }

    document.getElementById("level").addEventListener("click",function(){
        setTimeout(function () {
            document.getElementById("level").style.visibility = "hidden";
        }, 3000);});

    var divGame = document.getElementById('game');
    for (var r = 0; r < memoryGame.rowTile; r++) {
        var divRow = document.createElement('div');
        divRow.className = "row";
        for (var j = 0; j < memoryGame.colTile; j++) {
            var divCard = document.createElement('div');
            divCard.className = "card";
            divCard.id = (memoryGame.colTile * r) + j + 1;
            divCard.addEventListener("click", memoryGame.checkPictures);
            divRow.appendChild(divCard);
        }
        divGame.appendChild(divRow);
    }
    memoryGame.randomPictures();
};


//function that randomizes the pictures and puts them in a div randomly
memoryGame.randomPictures=function() {
    for (var i = 0; i < memoryGame.nTile; i++) {
        var ranNum = Math.floor(Math.random() * (memoryGame.nTile)) + 1;
        var divNum = document.getElementById(ranNum + "");
        while (divNum.getElementsByTagName('img').length > 0) {
            ranNum = Math.floor(Math.random() * (memoryGame.nTile)) + 1;
            divNum = document.getElementById(ranNum + "");
        }
        var newImg = document.createElement('img');
        newImg.id = memoryGame.arrImages[i].name;
        newImg.src = memoryGame.arrImages[i].src;
        newImg.className = "babyPic";
        newImg.style.display = "none";
        divNum.appendChild(newImg);

    }
};

//function that checks if the clicked pictures is equal to the previous clicked one
memoryGame.checkPictures=function(clickEvent) {
    if (!memoryGame.gamePaused) {
        var btn = clickEvent.target;
        var btnImg = btn.getElementsByTagName('img')[0];
        document.getElementById(btnImg.id).style.display = "block";
        var tile = clickEvent.target;
        var tileImg = tile.getElementsByTagName('img')[0];
        if (memoryGame.tileFliped === 0) {
            memoryGame.FirstCard = tileImg;
            memoryGame.tileFliped = 1;
        }
        else if (memoryGame.tileFliped === 1) {
            memoryGame.SecondCard = tileImg;
            if (memoryGame.FirstCard.src === memoryGame.SecondCard.src) {
                memoryGame.RightAnswerMemory.push(memoryGame.FirstCard);
                memoryGame.RightAnswerMemory.push(memoryGame.SecondCard);
                memoryGame.FirstCard = [];
                memoryGame.SecondCard = [];
                memoryGame.tileFliped = 0;
            }
            else {
                memoryGame.gamePaused = true;
                setTimeout(function () {
                    memoryGame.FirstCard.style.display = "none";
                    memoryGame.SecondCard.style.display = "none";
                    memoryGame.FirstCard = [];
                    memoryGame.SecondCard = [];
                    memoryGame.gamePaused = false;
                    memoryGame.tileFliped = 0;
                    memoryGame.countWrongAnswers++;
                }, 1000);
            }

        }
        //creating the pop up for the winner of the game with the amount of mistakes
        if (memoryGame.RightAnswerMemory.length === memoryGame.nTile) {
            var wrongS=document.createElement('span');
            wrongS.textContent= "Congratulations you won and with "+memoryGame.countWrongAnswers+" mistakes";
            wrongS.id="wrong";
            document.getElementById('message').appendChild(wrongS);
            var buttWindow=document.createElement('button');
            buttWindow.id="NG";
            buttWindow.onclick=memoryGame.loadCards;
            buttWindow.textContent="NEW GAME";
            document.getElementById('message').appendChild(buttWindow);
            document.querySelector('.answer#lightbox').style.display = "block";
        }
    }
    // memoryGame.reload=function(){
    //
    // }
};


document.getElementById("new").addEventListener("click", memoryGame.loadCards);
document.getElementById("newGame").addEventListener("click", memoryGame.loadCards);





