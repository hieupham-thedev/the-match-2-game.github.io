// Job 0: Random create the gamespace
var imgSource = [
	{
		name:"img1 undone",
		link:"https://static.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg"
	},
	{
		name:"img2 undone",
		link:"https://static.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg"
	},
	{
		name:"img3 undone",
		link:"https://static.pexels.com/photos/213399/pexels-photo-213399.jpeg"
	},
	{
		name:"img4 undone",
		link:"https://static.pexels.com/photos/158471/ibis-bird-red-animals-158471.jpeg"
	},
	{
		name:"img5 undone",
		link:"https://static.pexels.com/photos/133459/pexels-photo-133459.jpeg"
	},
	{
		name:"img6 undone",
		link:"https://static.pexels.com/photos/50988/ape-berber-monkeys-mammal-affchen-50988.jpeg"
	},
];

var order = [0,1,2,3,4,5,0,1,2,3,4,5];

order = shuffle(order);

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

createGamespace();

function createGamespace() {
	gamespace = document.getElementById("gamespace");
	for (var i=0; i<order.length;i++) {
		var img = document.createElement("img")
		img.className = imgSource[order[i]].name;
		img.src = imgSource[order[i]].link;
		gamespace.appendChild(img);
	}
}

// Job 1: Add listener to all image
var image = document.getElementsByClassName("undone");
for (var i = 0; i < image.length; i++) {
	image[i].addEventListener("click", processImg);
}

// Job 2: Check how many image is up
function imgUpQty() {
	var qty = 0;
	for (var i= 0; i< image.length; i++) {
		if (image[i].style.filter == "none") {
			qty++;
		}
	}
	return qty;
}

function processImg(event) {
	var qty = imgUpQty();
	if (qty == 0) {
		open1stImg(event);
	} else if (qty == 1) {
		open2ndImg(event);
		compare2Img();
	}
}

// Job 3: Up the 1st image
var chosenImg1 = {target:"", clock:null};
var chosenImg2 = {target:"", clock:null};

function open1stImg(event) {
	if (chosenImg1.target == "") {
		chosenImg1.target = event.target;
		chosenImg1.target.style.filter = "none";
		chosenImg1.target.removeEventListener("click", processImg);
		chosenImg1.clock = setTimeout(function closeImg(){
			chosenImg1.target.style.filter = "brightness(0)";
			chosenImg1.target.addEventListener("click", processImg);
			chosenImg1.target = "";
		},1000);
	}
}

// Job 4: Up the 2nd image
function open2ndImg(event) {
	if (chosenImg2.target == "") {
		chosenImg2.target = event.target;
		chosenImg2.target.style.filter = "none";
		chosenImg2.target.removeEventListener("click", processImg);
		chosenImg2.clock = setTimeout(function closeImg(){
			chosenImg2.target.style.filter = "brightness(0)";
			chosenImg2.target.addEventListener("click", processImg);
			chosenImg2.target = "";
		},1000);
	}
}

// Job 5: Compare 2 images and up those images if similar
function compare2Img() {
	if (chosenImg1.target.className === chosenImg2.target.className) {
		clearTimeout(chosenImg1.clock);
		clearTimeout(chosenImg2.clock);
		chosenImg1.target.removeEventListener("click", processImg);
		chosenImg2.target.removeEventListener("click", processImg);
		chosenImg1.target.className = chosenImg1.target.className.replace("undone", "finish");
		chosenImg2.target.className = chosenImg2.target.className.replace("undone", "finish");
		chosenImg1.target = "";
		chosenImg2.target = "";
		checkifWinning();
	}
}

// Job 6: Happen when winning
function checkifWinning() {
	if (image.length === 0) {
		document.getElementById("control").style.visibility = "visible";
		document.getElementById("reset").addEventListener("click", resetGame);
	}
}

function resetGame() {
	location.reload();
}