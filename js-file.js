const gridContainer = document.querySelector(".gridContainer");
const gridLength = 700;
gridContainer.style.width = `${gridLength}px`;
gridContainer.style.height = `${gridLength}px`;


function getRandomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;

}

function getRandomHSL() {
    let h = Math.floor(Math.random() * 361);
    let s = Math.floor(Math.random() * 101);
    let l = Math.floor(Math.random() * 101);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function darkenThisColor(oldColor) {
    let colorValues = oldColor.slice(4, -1);
    let colorArray = colorValues.split(", ");
    let r = +colorArray[0];
    let g = +colorArray[1];
    let b = +colorArray[2];

    let hslValues = rgbToHsl(r, g, b);
    let l = hslValues[2] * 100;
    let h = hslValues[0] * 360;
    let s = hslValues[1] * 100;

    if(l - 10 <= 0) l = 0;
    else l -= 10;

    return `hsl(${h}, ${s}%, ${l}%)`;

}

// give box a color. darken the color if it's already colored
function visitBox(event) {
    const box = event.target;
    const oldColor = box.style.backgroundColor;
    if(oldColor === "") box.style.backgroundColor = getRandomRGB();
    else {
        const darkenedColor = darkenThisColor(oldColor);
        box.style.backgroundColor = darkenedColor;
    }
    event.stopPropagation();    // stop bubbling. default (capture: false) means stop bubbling up
                                // capture: true means stop bubbling down
}

function populateGrid(gridContainer, numBoxesPerSide){
    const numBoxesTotal = numBoxesPerSide**2;

    for(let i = 0; i < numBoxesTotal; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('style', `flex: 0 0 ${100/numBoxesPerSide}%;`);
        box.addEventListener('mouseover', visitBox);
        gridContainer.appendChild(box);
    }
}

function resetGrid(event) {
    let numBoxesPerSide = prompt("Enter the number of squares you want per side (between 1 and 64). \nDefault: 16", "16");
    if (numBoxesPerSide === null) return;

    // first remove all boxes
    const container = document.querySelector('.gridContainer');
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        container.removeChild(box);
    });

    numBoxesPerSide = +numBoxesPerSide;

    if(!numBoxesPerSide || numBoxesPerSide > 64) {
        populateGrid(container, 16);
    }

    populateGrid(container, numBoxesPerSide);
}

populateGrid(gridContainer, 16);
const resetButton = document.querySelector('.clear');
resetButton.addEventListener('click', resetGrid);






