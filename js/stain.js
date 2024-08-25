class Stain extends GeneralActons {
    constructor(cells, divs) {
        super(divs)
        this._arrCells = cells
        this._arrDivs = divs
    }

    stain(el) {
        const enemys = this.findEnemys(el)
        this.filterEnemys(enemys, el)

        if (super.isEnemy(enemys)) {
            const movesForEat = this.findMovesForEat(enemys, el)
            super.avaibleEat(movesForEat, enemys)
        } else {
            const arrCellsMoves = this.move(el)
            const arrayDivsMoves = this.findDivs(arrCellsMoves)

            arrayDivsMoves.forEach(each => super.colorMoves(each))
        }

    }

    findEnemys(cell) {
        const array = []
        this.find(array, cell)
        const enemyFigurs = array.filter(each => each.figure != null && each._x > 0 && each._x < 7 && each._y > 0 && each._y < 7)

        enemyFigurs.forEach(each => {
            if (each.color == cell.color) {
                enemyFigurs.splice(enemyFigurs.indexOf(each, 1))
            }
        })
        return enemyFigurs
    }

    filterEnemys(arr, cell) {
        let x
        let y

        arr.forEach(each => {
            if (each._x < cell._x) {
                x = -1
            } else {
                x = 1
            }

            if (each._y < cell._y) {
                y = -1
            } else {
               y = 1
            }

            if (this.findEnemyFigure(each, cell).figure != null) {
                this.delEnemy(arr, each, x, y)
                arr.splice(arr.indexOf(each), 1)
            } else {
                this.delEnemy(arr, each, x, y)               
            }

        })
    }

    findMovesForEat(array, el) {
        const moves = []

        array.forEach(each => {
            let x
            let y

            if (each._x < el._x) {
                x = -1
            } else {
                x = 1
            }

            if (each._y < el._y) {
                y = -1
            } else {
                y = 1
            }

            this.pushMoves(moves, each, x, y)
        })

        return moves
    }

    pushMoves(arrayMoves, cell, delX, delY) {
        let doContinue = true

        for (let i = 1; i < 8; i++) {
            if ((cell._x + i * delX >= 0 || cell._x + i * delX <= 7) && (cell._y + i * delY >= 0 || cell._y + i * delY <= 7)) {
                const el = this._arrCells.find(el => el._x == cell._x + i * delX && el._y == cell._y + i * delY)

                if (el != undefined) {
                    if (el.figure != null && doContinue) {
                        doContinue = false
                    }

                    if (doContinue)
                        arrayMoves.push(el)
                }
            }

        }
    }

    findEnemyFigure(enemyFigure, figureAllied) {
        if (enemyFigure._x < figureAllied._x && enemyFigure._y < figureAllied._y) {
            return this._arrCells.find(el => el._x == enemyFigure._x - 1 && el._y == enemyFigure._y - 1)
        } else if (enemyFigure._x < figureAllied._x && enemyFigure._y > figureAllied._y) {
            return this._arrCells.find(el => el._x == enemyFigure._x - 1 && el._y == enemyFigure._y + 1)
        } else if (enemyFigure._x > figureAllied._x && enemyFigure._y < figureAllied._y) {
            return this._arrCells.find(el => el._x == enemyFigure._x + 1 && el._y == enemyFigure._y - 1)
        } else if (enemyFigure._x > figureAllied._x && enemyFigure._y > figureAllied._y) {
            return this._arrCells.find(el => el._x == enemyFigure._x + 1 && el._y == enemyFigure._y + 1)
        }
    }

    delEnemy(matrix, figureEnemy, delX, delY) {
        for (let i = 1; i < 8; i++) {
            if ((figureEnemy._x + i * delX >= 0 || figureEnemy._x + i * delX <= 7) && (figureEnemy._y + i * delY >= 0 || figureEnemy._y + i * delY <= 7)) {
                const el = matrix.find(el => el._x == figureEnemy._x + i * delX && el._y == figureEnemy._y + i * delY)

                if (el != undefined) {
                    matrix.splice(matrix.indexOf(el), 1)
                }
            }

        }         
    }


    move(cell) {
        const arr = []
        this.find(arr, cell)
        const moves = this.filterArrayMoves(arr, cell)
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
        this.findEnemyDel(oldEl, cell)
        super.newPositionFigure(cell, oldEl)
    }

    findEnemyDel(oldEl, newEl) {
        let x
        let y

        if (oldEl._x < newEl._x) {
            x = -1

        } else {
            x = 1
        }

        if (oldEl._y < newEl._y) {
            y = -1
        } else {
            y = 1
        }
 
        let doContinue = true
        
        for (let i = 1; i < 8; i++) {
            if ((newEl._x + i * x >= 0 || newEl._x + i * x <= 7) && (newEl._y + i * y >= 0 || newEl._y + i * y <= 7)) {
                const el = this._arrDivs.find(div => div.id == `${(newEl._x + i * x).toString()} ${(newEl._y + i * y).toString()}`)
 
                if (el != undefined && doContinue) {
                    if (el.style.background == "red") {
                        super.deleteFigure(el)

                        const coord = el.id.split(" ").map(each => parseInt(each))
                        const cell = this._arrCells.find(each => each._x == coord[0] && each._y == coord[1])
                        cell.figure = null
                        cell.color = null

                        doContinue = false
                    }
                }
            }
        }
    }

    filterArrayMoves(matrix, el) {
        this.delMoves(matrix, el)
        const arrMoves = matrix.map(each => {
            if (each.figure == null) {
                return each
            }
        })
            .filter(each => each != undefined)

        return arrMoves
    }

    delMoves(arr, cell) {
        arr.forEach(each => {
            if (each.figure != null) {
                const delX = each._x - cell._x
                const delY = each._y - cell._y

                for (let i = 1; i < 8; i++) {
                    if (delX < 0 && delY < 0 && each._x - i >= 0 && each._y - i >= 0) {
                        arr.splice(arr.indexOf(arr.find(el => el._x == each._x - i && el._y == each._y - i)), 1)
                    } else if (delX < 0 && delY > 0 && each._x - i >= 0 && each._y + i <= 7) {
                        arr.splice(arr.indexOf(arr.find(el => el._x == each._x - i && el._y == each._y + i)), 1)
                    } else if (delX > 0 && delY > 0 && each._x + 1 <= 7 && each._y + i <= 7) {
                        arr.splice(arr.indexOf(arr.find(el => el._x == each._x + i && el._y == each._y + i)), 1)
                    } else if (delX > 0 && delY < 0 && each._x + i <= 7 && each._y - i >= 0) {
                        arr.splice(arr.indexOf(arr.find(el => el._x == each._x + i && el._y == each._y - i)), 1)
                    }
                }
            }
        })
    } 7
}