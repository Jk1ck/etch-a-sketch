const gridContainer = document.getElementById('grid-container');
const resizeBtn = document.getElementById('resize-btn');
const clearBtn = document.getElementById('clear-btn');

let gridSize = 144;
let gridContainerHeight = gridContainer.offsetHeight;


function createGrid(gridSize){
    let arrayDiv = new Array();
    let lastColoredDiv;
    let divSize = Math.floor(gridContainerHeight/Math.sqrt(gridSize));
    for (let i = 1; i <= gridSize; i++){
        arrayDiv[i] = document.createElement('div');
        arrayDiv[i].className = 'gridDivs';
        arrayDiv[i].style.height = divSize + "px";
        arrayDiv[i].style.width = divSize +"px";
        gridContainer.appendChild(arrayDiv[i]);
        arrayDiv[i].addEventListener('click', function() {
            const currentColor = window.getComputedStyle(this).backgroundColor;
            const newColor = darkenColor(currentColor, 10);
            this.style.backgroundColor = newColor;
            lastColoredDiv = this;
        });
    };
};

createGrid(gridSize);

let isMouseDown = false;

gridContainer.addEventListener('mousedown', function(e) {
    isMouseDown = true;

    if (e.target.matches('div')) {
        const currentColor = window.getComputedStyle(e.target).backgroundColor;
        const newColor = darkenColor(currentColor, 10);
        e.target.style.backgroundColor = newColor;
        lastColoredDiv = e.target;
    }
});

gridContainer.addEventListener('mouseup', function() {
    isMouseDown = false;
    lastColoredDiv = null;
});

gridContainer.addEventListener('mousemove', function(e) {
    if (isMouseDown && e.target.matches('div') && e.target !== lastColoredDiv) {
        const currentColor = window.getComputedStyle(e.target).backgroundColor;
        const newColor = darkenColor(currentColor, 10);
        e.target.style.backgroundColor = newColor;
        lastColoredDiv = e.target;
    }
});


function darkenColor(color, percent) {
    const rgb = color.match(/\d+/g).map(Number);
    rgb[0] -= rgb[0] * (percent / 100);
    rgb[1] -= rgb[1] * (percent / 100);
    rgb[2] -= rgb[2] * (percent / 100);
    const hex = rgb.map(c => Math.round(c).toString(16).padStart(2, '0')).join('');
  
    return `#${hex}`; 
};

resizeBtn.addEventListener('click', () => {
    let input = 1000;
    while (input>100) {
        input = prompt("Squares per side? (shouldn't be over 100)");
    };
    gridSize = Math.pow(input, 2);
    const arrayDiv = document.querySelectorAll('.gridDivs');
    for (const div of arrayDiv) {
        div.remove();
    }
    createGrid(gridSize);
});

clearBtn.addEventListener('click', () =>{
    const arrayDiv = document.querySelectorAll('.gridDivs');
    for (const div of arrayDiv) {
        div.remove();
    }
    createGrid(gridSize);
});