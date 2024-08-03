const  container = document.getElementById("root")
const board = document.createElement("div")
board.id = "board"
container?.appendChild(board)

const cells = []
addCell(cells)
const divs = Array.from(board.children)

const figure = new Figure(cells, divs)
figure.addChecker()
//figure.testStain()

const control = new Control(cells, divs)
control.keyboard()