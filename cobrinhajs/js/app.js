const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const unitSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = unitSize;
let dy = 0;

let score = 0; // Variável para a pontuação

function drawSnake() {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'purple'; // Cor da borda da cobra
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'green'; // Cor da borda da comida
    ctx.fillRect(food.x, food.y, unitSize, unitSize);
    ctx.strokeRect(food.x, food.y, unitSize, unitSize);
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20); // Exibe a pontuação no canto superior esquerdo
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 20; // Incrementa a pontuação de 20 em 20 ao comer a comida
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
    food.y = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -unitSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = unitSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -unitSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = unitSize;
        dy = 0;
    }
});

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over!');
        document.location.reload();
    }

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        moveSnake();
        drawSnake();
        drawScore(); // Chama a função para desenhar a pontuação
        gameLoop();
    }, 100);
}

generateFood();
gameLoop();