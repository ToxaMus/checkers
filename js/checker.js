class Checker extends GeneralActons {
    constructor(arrayCells, arrayDivs) {
        super(arrayDivs)
        this._arrayCells = arrayCells
        this._arrayDivs = arrayDivs
    }

    checker(elem, colorMoveFigure) {
        const enemys = this.findEat(elem)
        const moves = this.avaibleMovesForEat(elem, enemys)
        this.filterEnemyFigure(enemys, moves)

        this.moveFigureChecker(enemys, moves, elem, colorMoveFigure)

    }   

    moveFigureChecker(enem, move, el, color) {
        if (el.figure == null) {
            this.moveChecker(el)
        } else {
            if (super.isEnemy(enem)) {
                super.avaibleEat(move, enem)
            } else {
                if (el.color == "white" && color) {
                    this.avaibleMoveWhite(el)
                } else if (el.color == "black" && !color) {
                    this.avaibleMoveBlack(el)
                }
            }
        }
    }

    avaibleMoveWhite(el) {

        if (el._y > 0 && el._y < 7) {
            const divs = []
            const oneDiv = `${(el._x - 1).toString()} ${(el._y + 1).toString()}`
            const twoDiv = `${(el._x - 1).toString()} ${(el._y - 1).toString()}`

            divs.push(this._arrayDivs.find(each => each.id == oneDiv))
            divs.push(this._arrayDivs.find(each => each.id == twoDiv))

            divs.forEach(each => {
                super.colorMoves(each)
            })

        } else if (el._y == 0) {
            const id = `${(el._x - 1).toString()} ${(el._y + 1).toString()}`
            const div = this._arrayDivs.find(each => each.id == id)

            super.colorMoves(div)

        } else if (el._y == 7) {
            const id = `${(el._x - 1).toString()} ${(el._y - 1).toString()}`
            const div = this._arrayDivs.find(each => each.id == id)

            super.colorMoves(div)
        }
    }

    avaibleMoveBlack(elCell) {
        if (elCell._y > 0 && elCell._y < 7) {
            const divs = []
            const oneDiv = `${(elCell._x + 1).toString()} ${(elCell._y + 1).toString()}`
            const twoDiv = `${(elCell._x + 1).toString()} ${(elCell._y - 1).toString()}`

            divs.push(this._arrayDivs.find(each => each.id == oneDiv))
            divs.push(this._arrayDivs.find(each => each.id == twoDiv))

            divs.forEach(each => {
                super.colorMoves(each)
            })

        } else if (elCell._y == 0) {
            const id = `${(elCell._x + 1).toString()} ${(elCell._y + 1).toString()}`
            const div = this._arrayDivs.find(each => each.id == id)
            super.colorMoves(div)
        } else if (elCell._y == 7) {
            const id = `${(elCell._x + 1).toString()} ${(elCell._y - 1).toString()}`
            const div = this._arrayDivs.find(each => each.id == id)
            super.colorMoves(div)
        }
    }

    moveChecker(cellElem) {
        const oldEl = super.findOldCell(cellElem, this._arrayCells)
        this.deleteEatenFigure(oldEl, cellElem)
        
        super.newPositionFigure(cellElem, oldEl)
    }

    avaibleMovesForEat(el, arr) {
        const cells = []

        arr.forEach(each => {
            if (each._x + 1 == el._x && each._y + 1 == el._y && each._x - 1 >= 0 && each._y - 1 >= 0) {
                cells.push(this._arrayCells.find(cell => cell._x == each._x - 1 && cell._y == each._y - 1))
            } else if (each._x + 1 == el._x && each._y - 1 == el._y && each._x - 1 >= 0 && each._y + 1 <= 7) {
                cells.push(this._arrayCells.find(cell => cell._x == each._x - 1 && cell._y == each._y + 1))
            } else if (each._x - 1 == el._x && each._y + 1 == el._y && each._x + 1 <= 7 && each._y - 1 >= 0) {
                cells.push(this._arrayCells.find(cell => cell._x == each._x + 1 && cell._y == each._y - 1))
            } else if (each._x - 1 == el._x && each._y - 1 == el._y && each._x + 1 <= 7 && each._y + 1 <= 7) {
                cells.push(this._arrayCells.find(cell => cell._x == each._x + 1 && cell._y == each._y + 1))
            } else {
                arr.splice(arr.indexOf(each))
            }

        })

        return cells
    }

    findEat(el) {
        const array = []
        if (el._x - 1 > 0 && el._y + 1 < 7) {
            array.push(this._arrayCells.find(each => each._x == el._x - 1 && each._y == el._y + 1))
        }

        if (el._x - 1 > 0 && el._y - 1 > 0) {
            array.push(this._arrayCells.find(each => each._x == el._x - 1 && each._y == el._y - 1))
        }

        if (el._x + 1 < 7 && el._y + 1 < 7) {
            array.push(this._arrayCells.find(each => each._x == el._x + 1 && each._y == el._y + 1));
        }

        if (el._x + 1 < 7 && el._y - 1 > 0) {
            array.push(this._arrayCells.find(each => each._x == el._x + 1 && each._y == el._y - 1));
        }

        return super.filterArrayMovesEat(array, el)
    }


    filterEnemyFigure(arrEnemy, arrMoves) {
        arrMoves.forEach(each => {
            if (each.figure != null) {
                arrEnemy.forEach(enem => {
                    if (enem._x + 1 == each._x && enem._y + 1 == each._y) {
                        arrEnemy.splice(arrEnemy.indexOf(enem), 1)
                    } else if (enem._x + 1 == each._x && enem._y - 1 == each._y) {
                        arrEnemy.splice(arrEnemy.indexOf(enem), 1)
                    } else if (enem._x - 1 == each._x && enem._y + 1 == each._y) {
                        arrEnemy.splice(arrEnemy.indexOf(enem), 1)
                    } else if (enem._x - 1 == each._x && enem._y - 1 == each._y) {
                        arrEnemy.splice(arrEnemy.indexOf(enem), 1)
                    }
                })
            }
        })
    }

    deleteEatenFigure(oldCell, newCell) {
        let x = newCell._x - oldCell._x
        let y = newCell._y - oldCell._y

        if (Math.abs(x) > 1) {
            if (x > 0) {
                x--
            } else {
                x++
            }

            if (y > 0) {
                y--
            } else {
                y++
            }

            const clearCell = this._arrayCells.find(each => each._x == oldCell._x + x && each._y == oldCell._y + y)
            clearCell.figure = null
            clearCell.color = null

            const div = this._arrayDivs.find(each => each.id == `${clearCell._x.toString()} ${clearCell._y.toString()}`)
            super.deleteFigure(div)

        }
    }
}