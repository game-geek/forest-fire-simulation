//import { Position } from "./FirePropagatorSimulator";
import { GridType } from "./gridGenerator";

const gridUI = document.querySelector("#grid") as HTMLDivElement
const canvas = document.getElementById("canvas-grid") as HTMLCanvasElement
canvas.width = 0
canvas.height = 0
let ctx: null | CanvasRenderingContext2D = null
if (canvas === null) {
    console.warn("no canvas element found")
} else {
    ctx = canvas.getContext("2d");
}
if (canvas && !ctx) console.warn("canvas isn't supported in your browser")




export function reRenderGrid(grid: GridType) {
    // consider grid existing
    for (const line of grid) {
        for (const coords of line) {
            console.log(coords)
        }
    }
}


export function renderGrid (grid: GridType) {
    // remove all previous grids
    gridUI.childNodes.forEach(element => {
        element.remove()
    });

    // generate new grid 
    const gridHTML = document.createElement("div")

    for (const line of grid) {
        let tempLine = document.createElement("div")

        for (const x of line) {
            let xDiv = document.createElement("div")
            // xDiv.appendChild(document.createTextNode(String(x)))
            // 0: burned;  1: forest ; 2: ground; 3: fire
            if (x.state === 0) {
                xDiv.classList.add("burnt")
            }
            else if (x.state === 1) {
                xDiv.classList.add("forest")
            }
            else if (x.state === 2) {
                xDiv.classList.add("ground")
            }
            else if (x.state === 3) {
                xDiv.classList.add("fire")
            }

            tempLine.appendChild(xDiv)
        }
        
        gridHTML.appendChild(tempLine)
    }

    // push it in the dom
    gridUI.appendChild (gridHTML)
    console.log("lol")
}


// export function reRenderCanvasGrid(fireList: Position[], previousFireList: Position[]) {
//     for 
// }


export function renderCanvasGrid(grid: GridType) {
    if (!ctx) {
        return console.error("no canvas element found or canvas is not supported on this browser")
    }
    // for performance, create a in memory virtual canvas
    // const offScreenCanvas = document.createElement("canvas") as HTMLCanvasElement; //FALSE:  bug this doesnt work when copying it to the real canvas
    const offScreenCanvas = new OffscreenCanvas(grid[0].length*10, grid.length*10)
    const offScreenCanvasCtx = offScreenCanvas.getContext('2d')
    if (!offScreenCanvasCtx) return console.error("canvas is not supported in this browser")
    // write to the virtual canvas
    for (let y=0; y < grid.length; y++) {
        for (let x=0; x < grid[y].length; x++) {
            // ctx.beginPath();
            // 0: burned;  1: forest ; 2: ground; 3: fire
            switch (grid[y][x].state) {
                case 0:
                   offScreenCanvasCtx.fillStyle ="black"
                   break
                case 1:
                    offScreenCanvasCtx.fillStyle ="green"
                    break
                case 2:
                    offScreenCanvasCtx.fillStyle ="white"
                    break
                case 3:
                    offScreenCanvasCtx.fillStyle ="red"
                    break
                default:
                    offScreenCanvasCtx.fillStyle ="black"
                    break
                    
            }
            offScreenCanvasCtx.fillRect(x*10, y*10, 10, 10)
            // offScreenCanvasCtx.fill()
            // ctx.stroke();
            // the bug was beginpath, fill and stroke
        }
    }

    // update the real canvas
      //copy canvas by DataUrl
    //   var sourceImageData = offScreenCanvas.toDataURL("image/png");
  
    //   var destinationImage = new Image;
    //   destinationImage.onload = function(){
    //     if (!ctx) return console.log("ctx is null")
    //     ctx.drawImage(destinationImage,0,0);
    //   };
    //   destinationImage.src = sourceImageData;
    ctx.clearRect(0, 0, grid[0].length*10, grid.length*10)
    canvas.width = grid[0].length*10
    canvas.height = grid.length*10
    console.log(offScreenCanvas, offScreenCanvasCtx, canvas, ctx)
    ctx.drawImage(offScreenCanvas, 0, 0);
    
}
// https://www.basedash.com/blog/what-is-uncaught-rangeerror-maximum-call-stack-size-exceeded-in-javascript