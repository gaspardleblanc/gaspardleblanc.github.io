const gridElement = document.getElementById('grid');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const clearButton = document.getElementById('clear');
const randomButton = document.getElementById('random');
const themeToggle = document.getElementById('theme-toggle');
const gridSizeInput = document.getElementById('grid-size');
const speedInput = document.getElementById('speed');

let rows = 30;
let cols = 30;
let grid = Array.from({ length: rows }, () => Array(cols).fill(false));
let intervalId;

function createGrid() {
    gridElement.innerHTML = '';
    gridElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    gridElement.style.gridTemplateRows = `repeat(${rows}, 30px)`;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => toggleCell(row, col, cell));
            gridElement.appendChild(cell);
        }
    }
}

function toggleCell(row, col, cell) {
    grid[row][col] = !grid[row][col];
    cell.classList.toggle('alive');
}

function step() {
    const newGrid = grid.map(arr => [...arr]);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const aliveNeighbors = countAliveNeighbors(row, col);
            if (grid[row][col]) {
                newGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                newGrid[row][col] = aliveNeighbors === 3;
            }
        }
    }

    grid = newGrid;
    updateGridDisplay();
}

function countAliveNeighbors(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    
    let count = 0;
    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            count += grid[newRow][newCol] ? 1 : 0;
        }
    }
    return count;
}

function updateGridDisplay() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        cell.classList.toggle('alive', grid[row][col]);
    });
}

function randomizeGrid() {
    grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() < 0.5));
    updateGridDisplay();
}

startButton.addEventListener('click', () => {
    if (!intervalId) {
        const speed = parseInt(speedInput.value) || 100;
        intervalId = setInterval(step, speed);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

clearButton.addEventListener('click', () => {
    grid = Array.from({ length: rows }, () => Array(cols).fill(false));
    updateGridDisplay();
});

randomButton.addEventListener('click', randomizeGrid);

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
});

// Handle grid size changes
gridSizeInput.addEventListener('change', () => {
    const newSize = parseInt(gridSizeInput.value);
    if (newSize >= 5 && newSize <= 50) {
        rows = newSize;
        cols = newSize;
        grid = Array.from({ length: rows }, () => Array(cols).fill(false));
        createGrid();
    }
});

// Initialize the grid
createGrid();
