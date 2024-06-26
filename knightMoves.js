class Knight {
  constructor() {
    this.BOARD_ROWS = 8;
    this.BOARD_COLUMNS = 8;
    this.visitedPositions = new Set();
  }

  findNextMoves(startPosition) {
    if (!startPosition) return;

    const potentialMoves = [];
    const [currentX, currentY] = startPosition;
    potentialMoves.push(
      [currentX + 2, currentY + 1],
      [currentX + 2, currentY - 1],
      [currentX - 2, currentY + 1],
      [currentX - 2, currentY - 1],
      [currentX + 1, currentY + 2],
      [currentX - 1, currentY + 2],
      [currentX + 1, currentY - 2],
      [currentX - 1, currentY - 2]
    );

    const validMoves = potentialMoves.filter(([newX, newY]) => {
      const positionKey = `${newX}, ${newY}`;

      return (
        newX >= 0 &&
        newX < this.BOARD_ROWS &&
        newY >= 0 &&
        newY < this.BOARD_COLUMNS &&
        !this.visitedPositions.has(positionKey)
      );
    });

    validMoves.forEach(([newX, newY]) => {
      const positionKey = `${newX}, ${newY}`;
      this.visitedPositions.add(positionKey);
    });

    return validMoves;
  }

  knightMoves(startPosition, targetPosition) {
    let queue = [[startPosition]];
    while (queue.length > 0) {
      const path = queue.shift();
      const lastPosition = path[path.length - 1];
      if (
        lastPosition[0] === targetPosition[0] &&
        lastPosition[1] === targetPosition[1]
      ) {
        return `You made it in ${
          path.length - 1
        } moves! Here is your path:\n${path
          .map((pos) => `[${pos}]`)
          .join(`\n`)}`;
      }

      const nextMoves = this.findNextMoves(lastPosition);
      nextMoves.forEach((move) => {
        const newPath = [...path, move];
        queue.push(newPath);
      });
    }

    return null;
  }
}

const knight = new Knight();
console.log(knight.knightMoves([3, 3], [6, 7]));
