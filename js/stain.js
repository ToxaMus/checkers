class Stain extends GeneralActons {
    constructor(cells, divs) {
        super(divs)
        this._arrCells = cells
        this._arrDivs = divs
    }

    stain(el) {
        const enemys = this.findEnemys(el)

        if (super.isEnemy(enemys)) {
            console.log(enemys)
        } else {
            const arrCellsMoves = this.move(el)
            const arrayDivsMoves = this.findDivs(arrCellsMoves)

            arrayDivsMoves.forEach(each => super.colorMoves(each))
        }

    }

    findEnemys(cell) {
        const array = []
        this.find(array, cell)

        array.forEach(each => {
            debugger
            if (each.figure == null || each.color == cell.color) {
                array.splice(array.indexOf(each), 1)

            }
        })

        return array
    }



    move(cell) {
        const arr = []
        this.find(arr, cell)
        const moves = this.filterArrayMoves(arr)
        return moves
    }

    find(arr, cell) {
        for (let i = 1; i < 8; i++) {
            if (cell._x - i >= 0 && cell._y + i <= 7) {
                arr.push(this._arrCells.find(each => each._x == cell._x - i && each._y == cell._y + i))
            }

            if (cell._x + i <= 7 && cell._y + i <= 7) {
                arr.push(this._arrCells.find(each => each._x == cell._x + i && each._y == cell._y + i))
            }

            if (cell._x + i <= 7 && cell._y - i >= 0) {
                arr.push(this._arrCells.find(each => each._x == cell._x + i && each._y == cell._y - i))
            }
            if (cell._x - i >= 0 && cell._y - i >= 0) {
                arr.push(this._arrCells.find(each => each._x == cell._x - i && each._y == cell._y - i))
            }
        }
    }

    findDivs(array) {
        const divs = []
        array.forEach(each => divs.push(this._arrDivs.find(div => div.id == `${each._x.toString()} ${each._y.toString()}`)))
        return divs
    }

    moveStain(cell) {
        const oldEl = super.findOldCell(cell, this._arrCells)
        super.newPositionFigure(cell, oldEl)
    }

    filterArrayMoves(matrix) {
        const arrMoves = matrix.map(each => {
            if (each.figure == null) {
                return each
            }
        })
            .filter(each => each != undefined)

        return arrMoves
    }
}