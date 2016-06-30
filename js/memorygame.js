"useStrict";
// this is the array that contains all my images
var arrImages = [
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
    {name: "baby15", src: "./images/puki13.jpg"},
    {name: "baby16", src: "./images/puki13.jpg"},
    {name: "baby17", src: "./images/puki11.jpg"},
    {name: "baby18", src: "./images/puki11.jpg"},
    {name: "baby19", src: "./images/puki12.jpg"},
    {name: "baby20", src: "./images/puki12.jpg"},
    {name: "baby21", src: "./images/puki16.jpg"},
    {name: "baby22", src: "./images/puki16.jpg"},
    {name: "baby23", src: "./images/puki17.jpg"},
    {name: "baby24", src: "./images/puki17.jpg"}
];


var RightAnswerMemory = [];   //array that will contain the images once they were founc
var tileFliped = 0; //counts the number of tiles that were fliped
var FirstCard = []; //saves the first card that was fliped
var SecondCard = []; // saves the second  that was fliped
var nTile=0; // in order to randomize the number of cards according to the level i need to save the number of tiles
var colTile=0; //how many colomns of tiles i wil have
var rowTile=0; // how many rows i will have according to the tiles
var gamePaused = false;

//function that checks which level was chosen by the player;
function isChecked(){
    var numTile=document.getElementsByClassName("length");
    for (var i=0; i < numTile.length; i++) {
        var btn = numTile[i];
        if (btn.checked) {
            nTile = parseInt(btn.value);
            console.log(nTile);
        }
    }
}


//function that loads the Game according to the level selected by the player

function loadGame (){
    switch (nTile){
        case 12:
            colTile=4;
            rowTile=3;
            break;
        case 18:
            colTile=6;
            rowTile=3;
            break;
        case 24:
            colTile=6;
            rowTile=4;
            break;
    }
    for (var i=0;i<rowTile;i++){
        var div= document.createElement('div');
        div.className="row";
        for (var j=0;j<colTile;j++){
            var div2=document.createElement('div');
            div2.className="card";
            div2.id=(colTile*i)+j+1;

            div2.addEventListener("click", checkPictures);
            div.appendChild(div2);
        }
        document.body.appendChild(div);
    }

    randomPictures();
}


//function that randomizes the pictures and puts them in a div randomly
function randomPictures() {
    for (var i = 0; i < nTile; i++) {
        var ranNum = Math.floor(Math.random() * (nTile)) + 1;
        var divNum = document.getElementById(ranNum + "");
        while (divNum.getElementsByTagName('img').length > 0) {
            ranNum = Math.floor(Math.random() * (nTile)) + 1;
            divNum = document.getElementById(ranNum + "");
        }
        var newImg = document.createElement('img');
        newImg.id = arrImages[i].name;
        newImg.src = arrImages[i].src;
        newImg.className = "babyPic";
        newImg.style.display = "none";
        divNum.appendChild(newImg);

    }
}

//function that checks which picture was turne
function checkPictures(clickEvent) {
    if (!gamePaused){
        var btn = clickEvent.target;
        var btnImg = btn.getElementsByTagName('img')[0];
        document.getElementById(btnImg.id).style.display = "block";
        var tile = clickEvent.target;
        var tileImg = tile.getElementsByTagName('img')[0];
        if (tileFliped === 0) {
            FirstCard = tileImg;
            tileFliped = 1;
        }
        else if (tileFliped === 1) {
            SecondCard = tileImg;
            if (FirstCard.src === SecondCard.src) {
                RightAnswerMemory.push(FirstCard);
                RightAnswerMemory.push(SecondCard);
                FirstCard = [];
                SecondCard = [];
                tileFliped = 0;
            }
            else {
                gamePaused = true;
                setTimeout(function (){
                    FirstCard.style.display = "none";
                    SecondCard.style.display = "none";
                    FirstCard = [];
                    SecondCard = [];
                    gamePaused = false;
                    tileFliped = 0;
                },1000);
            }

        }

        if (RightAnswerMemory.length===nTile){
            alert("You won!!! You are the best");
        }
    }
}




function showAll() {
    var arr = document.getElementsByClassName("babyPic");
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.display = "block";
    }
}
document.getElementById("button").addEventListener("click", showAll);



document.getElementById("button2").addEventListener("click",isChecked);
document.getElementById("button2").addEventListener("click",loadGame);




