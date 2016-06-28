
var arrImages=[
    {name:"baby1",src:"./images/baby.jpg"},
    {name:"baby2",src:"./images/baby.jpg"},
    {name:"baby3",src:"./images/baby2.jpg"},
    {name:"baby4",src:"./images/baby2.jpg"},
    {name:"baby5",src:"./images/baby3.jpg"},
    {name:"baby6",src:"./images/baby3.jpg"},
    {name:"baby7",src:"./images/baby4.jpg"},
    {name:"baby8",src:"./images/baby4.jpg"},
    {name:"baby9",src:"./images/baby5.jpg"},
    {name:"baby10",src:"./images/baby5.jpg"},
    {name:"baby11",src:"./images/baby6.jpg"},
    {name:"baby12",src:"./images/baby6.jpg"},
];
 function returnImage(clickEvent){
 var btn=clickEvent.target;
     var img=document.getElementById("baby1").style.display="block";
 }

function backToBackground (){
    
}

 // var back= document.getElementsByClassName("card");
 // for (var j=0;j<back.length;j++){
 // back[j].addEventListener("click",randomPictures);
 // }


function randomPictures(){
    for (var i=0;i<arrImages.length;i++){
        var ranNum= Math.floor((Math.random() * 12) + 1);
        var divNum=document.getElementById(ranNum);
      while (divNum.getElementsByTagName('img').length >0) {
           ranNum = Math.floor((Math.random() * 12) + 1);
           divNum = document.getElementById(ranNum);
       }
            var newImg=document.createElement('img');
            newImg.id=arrImages[i].name;
            newImg.src=arrImages[i].src;
            newImg.className="babyPic";
            newImg.style.display="none";
            divNum.appendChild(newImg);

    }
}

document.getElementById("button").addEventListener("click",showAll);
function showAll(){
    var arr=document.getElementsByClassName("babyPic");
    for (var i=0;i<arr.length;i++){
        arr[i].style.display="block";
    }
}

window.onload(randomPictures());