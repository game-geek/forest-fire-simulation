// create a grid randomly generated with 1's and 0's defined by a size and density

// types
type GenerateGridType = {
    size: {
        width: number;
        height: number;
    },
    forestDensity: number;
    firesCount: number;
}

export type GridType = CellType[][]
type CellType = {
    state: CellState, // 0: burned;  1: forest ; 2: ground; 3: fire
    initial: CellState
}
type CellState = 0 | 1 | 2 | 3


// helper functions
function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function fillRandomly(grid: GridType, density: number, totalAvailable: number, cellToOverride: CellState, overrideCode: CellState): number {
    const width = grid.length
    const height = grid[0].length

    // to calculate the density for the forest
    let forestCount = Math.floor((totalAvailable / 100) * density);
    let actual = 0;
    
    while (actual != forestCount){
        let x = generateRandomNumber(0, width-1);
        let y = generateRandomNumber(0, height-1);
        if (grid[y][x].state == cellToOverride){
            grid[y][x].state = overrideCode;
            grid[y][x].initial = overrideCode;
            actual ++;
        }
    }
    return forestCount
}



// main function 
export default function generateGrid({ size, forestDensity, firesCount }: GenerateGridType): {grid: GridType, treeCount: number} {
    const grid: GridType = []
    let tempGrid: CellType[] = []
    
    // create grid
    for (let y=0; y < size.height; y++) {
        tempGrid = []
        for (let x=0; x < size.width; x++) {
            tempGrid.push({
                state: 2,
                initial: 2
            })
        }
        grid.push([...tempGrid])
    }

    
    // to calculate the density for the forest
    // fill the forest
    //@ts-ignore
    const treeCount = fillRandomly(grid, forestDensity, size.width*size.height, 2, 1)
    // fill the fires
    // console.log("fires", fillRandomly(grid, fireDensity, treeCount, 1, 3))
    // fill one fire
    // fillRandomly(grid, 100, 1, 1, 3)
    //fill with fires that are count and not desity
    fillRandomly(grid, 100, firesCount, 1, 3)


    

    
    return {grid, treeCount}
}




export function resetGrid(grid: GridType) {
    // ease of use
    const gridWidth = grid[0].length
    const gridHeight = grid.length
    
    for (let y=0; y < gridHeight; y++) {
        for (let x=0; x < gridWidth; x++) {
            console.log(grid[y][x].initial)
            grid[y][x].state = grid[y][x].initial
        }
    }
}