const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector("#score");
const timeBoard = document.querySelector("#time");
const cats = document.querySelectorAll(".cat");

let lastHole;
let timeUp = false;
let score = 0;
let countdown;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole = holes[idx];
	if (hole === lastHole) return randomHole(holes);
	lastHole = hole;
	return hole;
}

function peep() {
	const time = randomTime(500, 1000);
	const hole = randomHole(holes);
	const cat = hole.querySelector(".cat");
	cat.classList.add("up");

	setTimeout(() => {
		cat.classList.remove("up");
		if (!timeUp) peep();
	}, time);
}

function startGame() {
	score = 0;
	scoreBoard.textContent = 0;
	timeUp = false;
	let timeLeft = 30;
	timeBoard.textContent = timeLeft;
	document.getElementById("start-btn").disabled = true;

	peep();

	countdown = setInterval(() => {
		timeLeft--;
		timeBoard.textContent = timeLeft;
		if (timeLeft <= 0) {
			clearInterval(countdown);
			timeUp = true;
			alert("Game Over! Your cat score is: " + score);
			document.getElementById("start-btn").disabled = false;
		}
	}, 1000);
}

function whack(e) {
	if (!e.isTrusted) return;
	score++;
	this.classList.remove("up");
	scoreBoard.textContent = score;
}

cats.forEach((cat) => cat.addEventListener("click", whack));