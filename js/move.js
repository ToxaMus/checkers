class Move {
    move = true

    constructor(arrayCells, arrayDivs) {
        this._arrayCells = arrayCells
        this._arrayDivs = arrayDivs
    }

    checker = new Checker(this._arrayCells, this._arrayDivs)

    enter(elCell, elDiv) {
        this.moveChecker(elCell, elDiv)
        this.returnColor()
        this.marker(elCell, elDiv)
    }

    colorMoves(elDiv) {
        if (!elDiv.firstChild)
            elDiv.style.backgroundColor = "blue"

    }

    marker(newCell, newDiv) {
        if (newCell.figure != null) {
            this.checkColorMove(newCell, newDiv)
        }
    }

    checkColorMove(cell, div) {
        if ((cell.color == "white" && this.move) || (cell.color == "black" && !this.move)) {
            div.style.backgroundColor = 'green'
            
            if (cell.figure == "checker") {
                this.checker.checker(cell)
            }
        }
    }

    deleteFigure(el) {
        el.removeChild(el.firstChild);
    }

    returnColor() {
        this._arrayDivs.forEach(each => {
            if (each.classList.contains("cellBlack")) {
                each.style.background = "#808080"
            }
        })
    }


    changeOfСourse(oldCell, newCell) {
        let x = newCell._x - oldCell._x

        if (Math.abs(x) == 1) {
            this.move = !this.move
        } else {
            const enemys = this.findEat(newCell)
            const moves = this.avaibleMovesForEat(newCell, enemys)
            this.filterEnemyFigure(enemys, moves)

            if (!this.isEnemy(moves)) {
                this.move = !this.move
            }

        }

        this.returnColor()
    }
}