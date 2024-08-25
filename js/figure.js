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
}