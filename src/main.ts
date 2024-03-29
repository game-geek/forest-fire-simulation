// import './main.css'
// import './style.css'
// bug, if import it here the html shows before the css
import {Position, getFires, propagateFires} from "./FirePropagatorSimulator"
import { createChart } from "./graph"
import generateGrid, { GridType, resetGrid } from "./gridGenerator"
import drawGraph from "./newGraph"
import {renderCanvasGrid} from "./renderGrid"
import {main, ready} from "./simulations/simulation"

// DOM REFERENCES
// UI 
const createButton = document.querySelector("#create") as HTMLButtonElement
const popups = document.querySelector(".popups") as HTMLDivElement
// create new forest popup
const createPopup = popups.querySelector(".create") as HTMLDivElement
const createForm = createPopup.querySelector("form") as HTMLFormElement

// create new forest popup
const endPopup = popups.querySelector(".end") as HTMLDivElement

// controlls
const simulationControlls = document.querySelector(".right-sidebar ") as HTMLDivElement
const toggleSimulationButton = simulationControlls.querySelector(".simulate") as HTMLButtonElement
const resetSimulationButton = simulationControlls.querySelector(".reset") as HTMLButtonElement
const speedSlider = simulationControlls.querySelector(".speed") as HTMLButtonElement
const stepSimulationButton = simulationControlls.querySelector(".step") as HTMLButtonElement
const toggleWindInput = simulationControlls.querySelector(".wind input") as HTMLInputElement
const windAngleInput = simulationControlls.querySelector(".angle input") as HTMLInputElement


// VARS
// list of all simulations
const forests: {
    grid: GridType
    fires: Position[]
    wind: boolean
    windAngle: number
    speed: number
    end: boolean
    dataLogs: number[]
}[] = []
// current simulation index -> forest
let currentForest: null | number = null
let simulating: boolean = false
let simulationLoop: null | NodeJS.Timeout = null
let DEFAULT_SPEED: number = 500


if (ready()) {
    console.log("started simulation")
    setTimeout(main, 100)
    console.log("ended simulation")
}


// LISTENERS

createButton.addEventListener("click", openCreatePopup)
createPopup.querySelector("form button.cancel")?.addEventListener("click", closeCreatePopup)
popups.addEventListener("click", (e) => {
    // check if clicked outside of the popup
    // @ts-ignore
    const classNameOfElement = e.target.className
    if (classNameOfElement === "create") {
        // clicked outside form -> close form
        closeCreatePopup()
    } else if (classNameOfElement === "end") {
        // clicked outside form -> close form
        closeEndPopup()
    }
})

// close end popup
endPopup.querySelector("form button")?.addEventListener("click", closeEndPopup)



// listening for create form submission
createForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // parse form data
    const formData = new FormData(createForm)
    const height = Number(formData.get("height"))
    const width = Number(formData.get("width"))
    const firesCount = Number(formData.get("fire-density"))
    const forestDensity = Number(formData.get("forest-density"))
    const wind = Boolean(formData.get("wind"))
    const windAngle = Number(formData.get("wind-angle"))
    console.log(wind, windAngle)
    
    if (height === 0 || width === 0 || firesCount > 100 || forestDensity > 100) return alert("width and height must be bigger than 0, density and fires can at most be 100")

    // generate grid with parsed values
    console.log({size: {height, width}, forestDensity, firesCount})
    const {grid} = generateGrid({size: {height, width}, forestDensity, firesCount})
    renderCanvasGrid(grid)
    const fires = getFires(grid)
    

    // for (let i=0; i < 3; i++ ){
    //     propagateFires(grid, fires)
    //     renderGrid(grid)
    //     // console.log(grid, fires)
    // }
    currentForest = forests.length
    forests.push({
        fires,
        grid,
        speed: DEFAULT_SPEED,
        wind,
        windAngle,
        end: false,
        dataLogs: []
    })
    closeCreatePopup()
})


function simulateLoop() {
    simulateOnce()

    // reccursevely
    if (currentForest === null) {
        simulating = false
        return console.log("you have no forests, please create one !") 
    }
    if (forests[currentForest].end == true) return endSimulation()
    simulationLoop = setTimeout(simulateLoop, forests[currentForest].speed);
}




// controll buttons

speedSlider.addEventListener("click", () => {
    if (currentForest === null) return console.log("you have no forests, please create one !")
    forests[currentForest].speed = 1000-Number(speedSlider.value)
    if (simulating) {
        if (simulationLoop) clearTimeout(simulationLoop)
        simulateLoop()
    }
})

toggleSimulationButton.addEventListener('click', () => {
    if (currentForest === null) {
        simulating = false
        return console.log(" error while simulating, no forests exist, create one")
    }
    if (forests[currentForest].end == true) return endSimulation()

    if (simulating) {
        startSimulation()
    } else {
        pauseSimulation()
    }
})


// toggle wind ui
toggleWindInput.addEventListener("change", (event) => {
    // @ts-ignore
    windAngleInput.disabled = !event.target.checked
    // @ts-ignore
    forests[currentForest].wind = event.target.checked
})


resetSimulationButton.addEventListener("click", resetSimulation)
stepSimulationButton.addEventListener("click", simulateOnce)


// create new forest button
function openCreatePopup() {
    createPopup.classList.remove("hidden")
}
function closeCreatePopup() {
    createPopup.classList.add("hidden")
}

// close end popup
function openEndPopup() {
    endPopup.classList.remove("hidden")
}
function closeEndPopup() {
    endPopup.classList.add("hidden")
}


// Prog



function endSimulation() {
    console.log("ending sim")
    if (currentForest === null) return console.log("no forests exist, create one")
    // get forest index -> currentForest
    // kill the setTimeout function (loop)
    if (simulationLoop) {
        clearTimeout(simulationLoop)
    }
    simulating = false
    forests[currentForest].end = true
    toggleSimulationButton.textContent = "Show Data"
    openEndPopup()
}



function resetSimulation() {
    // get forest index -> currentForest
    if (currentForest === null) return console.log("no forests exist, create one")
    resetGrid(forests[currentForest].grid)      
    forests[currentForest].fires = getFires(forests[currentForest].grid)
    renderCanvasGrid(forests[currentForest].grid)
    forests[currentForest].end = false
    toggleSimulationButton.textContent = "Start Simulation"
}

function startSimulation() {
    // kill the setTimeout function (loop)
    if (simulationLoop) {
        clearTimeout(simulationLoop)
    }
    simulating = false
    toggleSimulationButton.textContent = "Start Simulation"

}   

function pauseSimulation() {
    if (currentForest === null) return console.log("no forests exist, create one")
    if (simulationLoop) {
        clearTimeout(simulationLoop)
    } 
    if (forests[currentForest].end == true) endSimulation()
    // start loop
    simulateLoop()
    simulating = true
    toggleSimulationButton.textContent = "Pause Simulation"
}

function simulateOnce() {
    if (currentForest === null) {
        simulating = false
        return console.log(" error while simulating, no forests exist, create one")
    }
    const noMoreFires = propagateFires(forests[currentForest].grid, forests[currentForest].fires, forests[currentForest].dataLogs)
    renderCanvasGrid(forests[currentForest].grid)
    // verify if reached end
    if (noMoreFires) {
        forests[currentForest].end = true
        const svg = drawGraph(forests[currentForest].dataLogs)
        // @ts-ignore
        endPopup.querySelector("p").innerHTML = ""
        // @ts-ignore
        endPopup.querySelector("p")?.appendChild(svg)
        openEndPopup()
    }

}
