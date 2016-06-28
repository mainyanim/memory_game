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
];

var RightAnswerMemory = [];
var tileFliped = 0;
var FirstCard = [];
var SecondCard = [];
function returnImage(clickEvent) {
    var btn = clickEvent.target;
    var btnImg=btn.getElementsByTagName('img')[0];
    document.getElementById(btnImg.id).style.display = "block";
}

// function backToBackground(clickEvent) {
//     var btn = clickEvent.target;
//     var img = document.getElementById("baby1").style.display = "none";
// }

var back = document.getElementsByClassName("card");
for (var j = 0; j < back.length; j++) {
    back[j].addEventListener("click", returnImage);
    back[j].addEventListener("click", checkPictures);

}
function checkPictures(clickEvent) {
    var tile = clickEvent.target;
    var tileImg=tile.getElementsByTagName('img')[0];
    if (tileFliped === 0) {
        console.log(tileImg);
        FirstCard = tileImg;
        tileFliped = +1;
    }
    else if (tileFliped === 1) {
        console.log(tileImg);
        SecondCard = tileImg;
        if (FirstCard.src === SecondCard.src) {
            RightAnswerMemory.push(FirstCard);
            RightAnswerMemory.push(SecondCard);
            FirstCard = [];
            SecondCard = [];
            tileFliped = 0;
        }
        else {
            FirstCard.style.display="none";
            SecondCard.style.display="none";
            FirstCard = [];
            SecondCard = [];
            tileFliped = 0;
        }

    }

}


function randomPictures() {
    for (var i = 0; i < arrImages.length; i++) {
        var ranNum = Math.floor((Math.random() * 12) + 1);
        var divNum = document.getElementById(ranNum);
        while (divNum.getElementsByTagName('img').length > 0) {
            ranNum = Math.floor((Math.random() * 12) + 1);
            divNum = document.getElementById(ranNum);
        }
        var newImg = document.createElement('img');
        newImg.id = arrImages[i].name;
        newImg.src = arrImages[i].src;
        newImg.className = "babyPic";
        newImg.style.display = "none";
        divNum.appendChild(newImg);

    }
}

document.getElementById("button").addEventListener("click", showAll);
function showAll() {
    var arr = document.getElementsByClassName("babyPic");
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.display = "block";
    }
}





window.onload= randomPictures;