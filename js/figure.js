    class Figure {
    constructor(arrayCells, arrayDivs) {
        this._arrayCells = arrayCells
        this._arrayDivs = arrayDivs
    }

    addChecker() {
        for (let i = 0; i < this._arrayCells.length; i++) {
            const cell = this._arrayCells[i]
            const div = this._arrayDivs[i]

            if (div.classList.contains("cellBlack") && (cell._x <= 2 || cell._x >= 5)) {
                const newChecker = document.createElement('div')
                newChecker.className = "figure"

                if (cell._x < 3) {
                    newChecker.classList.add("black")
                    cell.figure = "checker"
                    cell.color = "black"
                } else if (cell._x > 4) {
                    newChecker.classList.add("white")
                    cell.figure = "checker"
                    cell.color = "white"
                }

                div.appendChild(newChecker)
            }
        }
    }

    testStain() {
        const cell = this._arrayCells.find(each => each._x == 4 && each._y == 4)
        cell.figure = "stain"
        cell.color = "white"

        const div = this._arrayDivs.find(each => each.id == `${cell._x.toString()} ${cell._y.toString()}`)

        const newStain = document.createElement('div')
        newStain.className = "figure"
        newStain.classList.add("white")
        newStain.innerHTML = "<p class = 'stain-text'>W</p>"
        newStain.style.color = "black"

        div.appendChild(newStain)

        const cellChecker = this._arrayCells.find(each => each._x == 6 && each._y ==  6)
 
        const newChecker = document.createElement('div')
        newChecker.className = "figure"

        newChecker.classList.add("black")
        cellChecker.figure = "checker"
        cellChecker.color = "black"

        const checkerDiv = this._arrayDivs.find(each => each.id == `${cellChecker._x.toString()} ${cellChecker._y.toString()}`)
        checkerDiv.appendChild(newChecker)
    }
}