const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gridSize = 10;
const canvasSize = canvas.width;

let snake = [
	{x: 0, y: 0},
	{x: gridSize, y: 0},
	{x: 2 * gridSize, y: 0},
];

let food = {x: 0, y: 0};
generateFood();

let direction = "right";

function generateFood() {
	food.x = Math.floor(Math.random() * canvasSize / gridSize) * gridSize;
	food.y = Math.floor(Math.random() * canvasSize / gridSize) * gridSize;
}

function drawSnake() {
	ctx.fillStyle = "black";
	snake.forEach((segment) => {
		ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
	});
}

function moveSnake() {
	const head = {x: snake[0].x, y: snake[0].y};

	switch(direction) {
		case "up":
			head.y -= gridSize;
			break;
		case "down":
			head.y += gridSize;
			break;
		case "left":
			head.x -= gridSize;
			break;
		case "right":
			head.x += gridSize;
			break;
	}

	snake.unshift(head);

	if (head.x === food.x && head.y === food.y) {
		generateFood();
	} else {
		snake.pop();
	}
}

function update() {
	ctx.clearRect(0, 0, canvasSize, canvasSize);
	drawSnake();
	moveSnake();
	drawFood();
}

function drawFood() {
	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function keyDown(event) {
	switch(event.keyCode) {
		case 37: // left arrow
			if (direction !== "right") {
				direction = "left";
			}
			break;
		case 38: // up arrow
			if (direction !== "down") {
				direction = "up";
			}
			break;
		case 39: // right arrow
			if (direction !== "left") {
				direction = "right";
			}
			break;
		case 40: // down arrow
			if (direction !== "up") {
				direction = "down";
			}
			break;
	}
}

document.addEventListener("keydown", keyDown);
setInterval(update, 100);
