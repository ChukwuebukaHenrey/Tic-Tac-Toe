# Tic-Tac-Toe

A browser-based Tic-Tac-Toe game built with HTML, CSS, and vanilla JavaScript. This project focuses on game logic, state management, and modular JavaScript using the Module Pattern and Factory Functions.

## Features

- **Two-player gameplay** — Play as X and O, taking turns on a 3×3 grid.
- **Win detection** — Automatically checks all rows, columns, and diagonals for a winning combination.
- **Draw detection** — Identifies when the board is full and neither player has won.
- **Move validation** — Prevents players from marking occupied cells or making invalid moves.
- **Game state management** — Tracks the current player, game status, and winner.
- **Restart functionality** — Reset the board and start a new game at any time.
- **Dynamic UI updates** — Updates the board and game status as players make their moves.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

No external libraries or frameworks are required.

## Getting Started

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/ChukwuebukaHenrey/Tic-Tac-Toe.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Tic-Tac-Toe
   ```

3. Open `index.html` in your browser.

You can also use the Live Server extension in VS Code for local development.

## How to Play

1. Player 1 starts with **X**.
2. Player 2 plays with **O**.
3. Players take turns selecting an empty cell.
4. The first player to align three marks horizontally, vertically, or diagonally wins.
5. If all nine cells are filled without a winner, the game ends in a draw.
6. Use the reset button to start a new game.

## Project Structure

```text
Tic-Tac-Toe/
├── index.html
├── style.css
├── script.js
├── Tic_tac_toe.svg
├── tic-tac-toe-game-svgrepo-com.svg
└── fonts/
```

## Code Architecture

The JavaScript is organized into separate modules, each responsible for a specific part of the application.

### 1. Gameboard

Manages the board state and provides methods to:

- Retrieve a copy of the board.
- Place marks in valid, unoccupied cells.
- Reset the board.
- Check whether the board is full.

The board state remains private, preventing outside code from modifying it directly.

### 2. Player Factory

The `createPlayer()` factory function creates player objects containing a name and a marker.

### 3. GameEvaluator

Evaluates the current board and determines whether the game has been won, tied, or is still ongoing. It does not modify the board or interact with the DOM.

### 4. GameController

Coordinates the game flow by managing turns, validating moves through the Gameboard, processing evaluation results, and restarting the game.

### 5. UI Module

Handles DOM interaction, renders the board, displays the current player's turn or game result, and registers click events.

This separation keeps game logic independent of presentation and makes individual responsibilities easier to understand and maintain.

## What I Learned

Building this project helped me practise:

- JavaScript closures and the Module Pattern.
- Factory Functions and object creation.
- Encapsulation and private state.
- Separation of concerns.
- Array methods and board-state evaluation.
- DOM manipulation and event handling.
- Managing game state and validating user actions.

## Future Improvements

- Add a single-player mode with an AI opponent.
- Track scores across multiple rounds.
- Improve accessibility and keyboard navigation.
- Add automated tests for game logic.

## Author

**Chukwuebuka Henrey**

- GitHub: [@ChukwuebukaHenrey](https://github.com/ChukwuebukaHenrey)

---

If you find this project useful, consider giving the repository a star!
