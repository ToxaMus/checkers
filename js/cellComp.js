function addCell(array) {
    const board = document.getElementById("board")
    let flag =  false

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (j == 0) {
                flag = !flag
            }
            
            const cell = document.createElement('div')
            cell.className = "cell"
            cell.id = `${i.toString()} ${j.toString()}`
    

            if (flag) {
                cell.classList.add("cellBlack")
            } else {
                cell.classList.add("cellWhite")

            }
            board.appendChild(cell)
            array.push(new Cell(i, j))

            flag = !flag
        }
    }
}
