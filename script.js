document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".board");
    const scoreElement = document.getElementById("score");
    const gridSize = 20; // Grid size is 20x20

    let snake = [{ row: 10, col: 10 }]; // Initial snake position
    let food = { row: getRandomNumber(), col: getRandomNumber() }; // Initial food position
    let direction = "right";
    let score = 0;

    function getRandomNumber() {
        return Math.floor(Math.random() * gridSize) + 1;
    }

    function createPixel(row, col, className) {
        const pixel = document.createElement("div");
        pixel.classList.add(className);
        pixel.classList.add("pixel");
        pixel.id = `pixel_${row}_${col}`;
        pixel.style.gridRow = row;
        pixel.style.gridColumn = col;
        gameContainer.appendChild(pixel);
    }

    function updateGame() {
        const head = snake[0];
        let newHead = { ...head };

        if (direction === "right") {
            newHead.col += 1;
        } else if (direction === "left") {
            newHead.col -= 1;
        } else if (direction === "up") {
            newHead.row -= 1;
        } else if (direction === "down") {
            newHead.row += 1;
        }

        if (newHead.row === food.row && newHead.col === food.col) {
            snake.unshift(newHead);
            score += 10;
            scoreElement.textContent = score;
            food = { row: getRandomNumber(), col: getRandomNumber() };
            createPixel(food.row, food.col, "food");
        } else {
            snake.unshift(newHead);
            const tail = snake.pop();
            document.getElementById(`pixel_${tail.row}_${tail.col}`).remove();
        }

        if (
            newHead.row < 1 ||
            newHead.row > gridSize ||
            newHead.col < 1 ||
            newHead.col > gridSize ||
            isCollision(newHead)
        ) {
            clearInterval(gameInterval);
            alert("Game Over! Your score: " + score);
            return;
        }

        gameContainer.innerHTML = "";
        snake.forEach((segment, index) => {
            createPixel(segment.row, segment.col, index === 0 ? "head" : "");
        });
    }

    function isCollision(newHead) {
        return snake.some((segment) => segment.row === newHead.row && segment.col === newHead.col);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && direction !== "down") {
            direction = "up";
        } else if (event.key === "ArrowDown" && direction !== "up") {
            direction = "down";
        } else if (event.key === "ArrowLeft" && direction !== "right") {
            direction = "left";
        } else if (event.key === "ArrowRight" && direction !== "left") {
            direction = "right";
        }
    });

    snake.forEach((segment) => createPixel(segment.row, segment.col, "head"));
    createPixel(food.row, food.col, "food");

    // Start the game loop
    const gameInterval = setInterval(updateGame, 100);
});

