class Move extends GeneralActons {
    move = true
    oldCell

    constructor(arrayCells, arrayDivs) {
        super(arrayDivs)
        this._checker = new Checker(arrayCells, arrayDivs)
        this._stain = new Stain(arrayCells, arrayDivs)
        this._arrayCells = arrayCells
        this._arrayDivs = arrayDivs
    }


    enter(elCell, elDiv) {
        this.checkColorMove(elCell, elDiv)
        super.returnColor()
        this.marker(elCell, elDiv)
    }

    marker(newCell, newDiv) {
        if (newCell.figure != null) {
            this.checkColorMove(newCell, newDiv)
        }
    }

    checkColorMove(cell, div) {
        if ((cell.color == "white" && this.move) || (cell.color == "black" && !this.move)) {
            div.style.backgroundColor = 'green'
            this.oldCell = cell

            if (this.oldCell.figure == "checker") {
                this._checker.checker(cell, this.move)
            } else {
                this._stain.stain(cell)
            }

        } else if (div.style.backgroundColor == 'blue') {
            if (this.oldCell.figure == "checker") {
                this._checker.checker(cell, this.move)

            } else {
                this._stain.moveStain(cell)
            }

            this.changeOfСourse(cell)
        }
    }

    checker(el) {
        let x = el._x - this.oldCell._x

        if (Math.abs(x) == 1) {
            this.move = !this.move
        } else {
            const enemys = this._checker.findEat(el)
            const moves = this._checker.avaibleMovesForEat(el, enemys)
            this._checker.filterEnemyFigure(enemys, moves)

            if (!this._checker.isEnemy(enemys)) {
                this.move = !this.move

            }
        }
    }

    makeNewStain(cell) {
        if ((cell._x == 0 && cell.color == 'white') || (cell._x == 7 && cell.color == 'black')) {
            cell.figure = "stain"            

            const div = this._arrayDivs.find(el => el.id == `${cell._x.toString()} ${cell._y.toString()}`)
            const text = document.createElement('p')
            text.innerHTML = 'W'
            text.classList.add('stain-text')

            if (cell.color == 'black') {
                text.style.color = 'white'
            }

            const figure = div.firstElementChild

            figure.appendChild(text)
        }
    }

    stain(el) {
        const enemys = this._stain.findEnemys(this.oldCell)
        this._stain.filterEnemys(enemys, this.oldCell)

        if (!super.isEnemy(enemys)) {
            this.move = !this.move
        } else {
            const figures = this._stain.findEnemys(el)
            this._stain.filterEnemys(figures, el)
 
            if (!this.isEnemy(figures))
                this.move = !this.move
        }
    }

    changeOfСourse(newCell) {
        if (newCell.figure == "checker") {
            this.checker(newCell)
            this.makeNewStain(newCell)
        } else {
            this.stain(newCell)
        }
        super.returnColor()
    }
} 