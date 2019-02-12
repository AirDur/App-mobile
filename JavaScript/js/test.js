function HelloWorld() {
    var name = document.getElementById("input_name");
    var strToShow = 'Hello World';

    if(name.value) { strToShow += " " + name.value;}
    strToShow += " !";

    alert(strToShow);
}

function changeImage() {
    var image = document.getElementById("Image_1");
    var bt_2 = document.getElementById("button_switch");
    
    if(bt_2.innerText == "Allumer") {
        image.src = "img/étape9.jpg";
        bt_2.innerText = "Eteindre";
    } else {
        image.src = "img/étape1.png";
        bt_2.innerText = "Allumer";
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    var bt = document.getElementById("button_hello");
    
    bt.addEventListener("click", HelloWorld);

    var bt_2 = document.getElementById("button_switch");
    bt_2.addEventListener("click", changeImage);
});