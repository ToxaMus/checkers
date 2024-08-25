class GeneralActons {
    constructor(divs) {
        this._divs = divs
    }

    deleteFigure(el) {
        el.firstElementChild.remove();
    }

    returnColor() {
        this._divs.forEach(each => {
            if (each.classList.contains("cellBlack")) {
                each.style.background = "#808080"
            }
        })
    }

    colorMoves(elDiv) {
        if (!elDiv.firstChild)
            elDiv.style.backgroundColor = "blue"
    }

    filterArrayMovesEat(arr, el) {
        const arrCells = arr.map(each => {
            if (each != undefined && each.figure != null && each.color != el.color) {
                return each
            }
        })
            .filter(each => each != undefined)

        return arrCells
    }

    moveFigure(el) {
        const divElem = this._divs.find(each => each.id == `${el._x.toString()} ${el._y.toString()}`)
        if (divElem.style.backgroundColor == "blue" && divElem.style.border == '4px solid orange') {

            const oldDiv = this._divs.find(each => each.style.backgroundColor == 'green')
            const figure = oldDiv.firstElementChild

            if (figure !=null) {
                divElem.appendChild(figure)
            }

            return oldDiv
        }
    }

    newPositionFigure(newEl, oldEl) {
        if (oldEl != undefined) {
            newEl.figure = oldEl.figure
            newEl.color = oldEl.color

            oldEl.figure = null
            oldEl.color = null
        }
    }

    findOldCell(cell, arrayCells) {
        if (this.moveFigure(cell) != undefined ) {
            const oldDiv = this.moveFigure(cell)

            const coord = oldDiv.id.split(" ")
            coord.map(each => parseInt(each))

            const oldCell = arrayCells.find(each => each._x == coord[0] && each._y == coord[1])

            return oldCell
        }
    }

    avaibleEat(cells, arr) {
        cells.forEach(each => {
            if (each.figure == null) {
                const div = this._divs.find(el => el.id == `${(each._x).toString()} ${(each._y).toString()}`)
                div.style.background = "blue"
            }
        })

        arr.forEach(each => {
            const div = this._divs.find(el => el.id == `${(each._x).toString()} ${(each._y).toString()}`)
            div.style.background = "red"
        })
    }

    isEnemy(array) {
        if (array.length != 0) {
            return true
        } else {
            return false
        }
    }
}