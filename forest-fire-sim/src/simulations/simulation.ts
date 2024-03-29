import { getFires, propagateFires } from "../FirePropagatorSimulator"
import generateGrid from "../gridGenerator"


export function ready() {
    showProgress()
    return false
}


export async function main() {
    // const grid = generateGrid({size: {height, width}, forestDensity, firesCount})
    // const fires = getFires(grid)
    // constants
    const size = {
        width: 100,
        height: 100
    }
    const totalList: [number, number][] = []

    const sims = 10000
    let perc = 0


    // loop thruall the densities
    for (let density = 1; density < 100; density++) {
        let totalData: [number, number][] = []

        // run x times the simulation to get a mean
        for (let i=0; i < sims;i++){
            totalData.push(simulate(size, density, 1))

            // // progress
            // perc += 1/sims
            // updateProgress(perc)
            // await new Promise(r => setTimeout(r, 2));
        }
        // progress
        perc += 1
        updateProgress(perc)
        await new Promise(r => setTimeout(r, 1));
        // perc = Math.ceil(perc)


        let total: number = 0
        for (const simulationData of totalData) {
            total += simulationData[1]
        }
        const burnedForestMean = Math.ceil(total/totalData.length)

        const forestLeftmean = totalData[0][0] - burnedForestMean
        const percentageForestLestMean = Math.ceil((100/totalData[0][0])*forestLeftmean)
        totalList.push([density, percentageForestLestMean])

    }
    console.log(totalList)
    download(totalList, "simulation_100*100-10000x-1>100")
}



function simulate (size: {height: number, width: number}, forestDensity: number, firesCount:number): [number, number] {
    
    const {grid, treeCount} = generateGrid({size, forestDensity, firesCount})
    const fires = getFires(grid)
    const dataLogs: number[] = []
    
    while (!propagateFires(grid, fires, dataLogs)) {
        continue
    }
    return [treeCount, dataLogs[dataLogs.length-1]] // burned trees over time -> last index: total burned trees
}



function download(data: any[], name: string = "data") {

	var csvContent = "data:text/csv;charset=utf-8,";
	data.forEach(function(infoArray, index){
        let dataString = infoArray.join(",");
        csvContent += index < data.length ? dataString+ "\n" : dataString;
    });

    var encodedUri = encodeURI(csvContent);
    // window.open(encodedUri, "_blank", "name=123");  // doesn't support names for the file


    
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name +".csv");
    document.body.appendChild(link); // Required for FF

    link.click();


// const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
// const objUrl = URL.createObjectURL(blob)
// const link = document.createElement('a')
// link.setAttribute('href', objUrl)
// link.setAttribute('download', 'File.csv')
// link.textContent = 'Click to Download'
// link.click()



}


function updateProgress(percentage: number) {
    const div = document.querySelector('#simulation')
    if (!div) return console.log("ERROR")
    div.textContent = "Simulation is " + String(percentage) + "% done."
}

function showProgress() {
    const div = document.querySelector('#simulation')
    if (!div) return console.log("ERROR")
    
    div.classList.remove("hidden")
}