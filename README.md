# 💣 Minesweeper Game

A classic Minesweeper game built with **HTML**, **CSS**, and **JavaScript**. Click to reveal cells, flag potential mines, and avoid triggering a bomb. Play against the clock and beat the board!


## 🎮 Features

- 10×10 grid with 15 randomly placed mines.
- Left-click to reveal cells.
- Right-click or long press to place or remove flags.
- Timer starts on first click.
- Flag counter to track remaining flags.
- Game over screen with 💥 explosion emoji when a mine is triggered.
- Win screen when all safe cells are revealed.
- Play again and reset functionality.


## 📸 Gameplay Preview

- 💣 Mines are hidden across the grid.
- 🚩 Right-click to place flags where you suspect mines.
- 💥 When you click on a mine, it explodes and ends the game.
- 🏆 Reveal all non-mine cells to win!


## 🧠 How It Works

- The board is initialized with all cells hidden.
- Mines are randomly placed on the board at the start of the game.
- Each non-mine cell displays the number of adjacent mines.
- Recursive reveal is triggered when clicking on a cell with zero neighboring mines.
- A win is detected when all non-mine cells are revealed.

## 🕹️ How to play
- Visit https://adrienrenggli.github.io/Minesweeper/
- Or download this repository and open `index.html` in any web browser