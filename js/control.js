class Control {

    constructor(arrayCells, arrayDivs) {
        this._arrayCells = arrayCells
        this._arrayDivs = arrayDivs
        this._move = new Move(this._arrayCells, this._arrayDivs)
    }

    keyboard() {
        let div = this._arrayDivs.find(each => each.id == '4 4')
        div.style.border = '4px solid orange'

        let cell = this._arrayCells.find(each => each._x == 4 && each._y == 4)



        document.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    if (cell._x - 1 >= 0) {
                        cell = this._arrayCells.find(each => each._x == cell._x - 1 && each._y == cell._y)
                        div = this.border(div, cell)

                    }
                    break;

                case 'ArrowDown':
                    if (cell._x + 1 <= 7) {
                        cell = this._arrayCells.find(each => each._x == cell._x + 1 && each._y == cell._y)
                        div = this.border(div, cell)

                    }

                    break;
                case 'ArrowLeft':
                    if (cell._y - 1 >= 0) {
                        cell = this._arrayCells.find(each => each._x == cell._x && each._y == cell._y - 1)
                        div = this.border(div, cell)

                    }

                    break;
                case 'ArrowRight':
                    if (cell._y + 1 <= 7) {
                        cell = this._arrayCells.find(each => each._x == cell._x && each._y == cell._y + 1)
                        div = this.border(div, cell)

                    }

                    break;

                case 'Enter':
                    this._move.enter(cell, div)
                    break;
            }
        })
    }

    border(elDiv, elCell) {
        elDiv.style.border = '1px solid black'
        elDiv = this._arrayDivs.find(each => each.id == (`${elCell._x.toString()} ${elCell._y.toString()}`))
        elDiv.style.border = '4px solid orange'

        return elDiv
    }
}