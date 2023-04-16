const gridContainer = document.getElementById('grid-container');

let gridSize = 64;
let gridContainerHeight = gridContainer.offsetHeight;
let divSize = Math.floor(gridContainerHeight/Math.sqrt(gridSize));


function createGrid(gridSize){
    let arrayDiv = new Array();
    for (var i = 1; i <= gridSize; i++){
        arrayDiv[i] = document.createElement('div');
        arrayDiv[i].id = 'div' + i;
        arrayDiv[i].style.height = divSize + "px";
        arrayDiv[i].style.width = divSize +"px";
        gridContainer.appendChild(arrayDiv[i]);
    };
};

createGrid(gridSize);