const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = randomPosition();
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  moveSnake();

  if (checkCollision()) {
    alert("game over, u suck lol. score: " + score);
    resetGame();
    return;
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({}); // grow
    food = randomPosition();
    score++;
  }

  drawEverything();
}

function moveSnake() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;
  snake.unshift(head);
  snake.pop();
}

function changeDirection(e) {
  const keyMap = {
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
  };
  const newDir = keyMap[e.key.toLowerCase()];
  if (newDir) direction = newDir;
}

function checkCollision() {
  const head = snake[0];
  return (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount ||
    snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)
  );
}

function drawEverything() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (const seg of snake) {
    ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 2, gridSize - 2);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function randomPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = randomPosition();
  score = 0;
}

setInterval(gameLoop, 100);
