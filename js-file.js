const gridContainer = document.querySelector(".gridContainer");
const gridLength = 500;
gridContainer.style.width = `${gridLength}px`;
gridContainer.style.length = `${gridLength}px`;


function setBoxHandW(box, numBoxesPerSide){
    let length = gridLength / numBoxesPerSide;
    box.style.height = `${length}px`;
    box.style.width = `${length}px`;
}

function getRandomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;

}

function visitBox(event) {
    const box = event.target;
    console.log(box.style.backgroundColor);
    box.style.backgroundColor = getRandomRGB();
    event.stopPropagation();    // stop bubbling. default (capture: false) means stop bubbling up
                                // capture: true means stop bubbling down
}

function populateGrid(gridContainer, numBoxesPerSide){
    numBoxesTotal = numBoxesPerSide**2;
    for(let i = 0; i < numBoxesTotal; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        // box.setAttribute('style', 'width: 48.75px; height: 48.75px;');
        setBoxHandW(box, numBoxesPerSide);
        gridContainer.appendChild(box);
    }
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('mouseover', visitBox);
    });
}

function resetGrid(event) {
    let numBoxesPerSide = +prompt("Enter number of squares you want per side (between 1 and 100). \nDefault: 16", "16");

    const container = document.querySelector('.gridContainer');

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        container.removeChild(box);
    });



    if(!numBoxesPerSide) {
        populateGrid(container, 16);
    }
    populateGrid(container, numBoxesPerSide);

    
}

populateGrid(gridContainer, 16);
const resetButton = document.querySelector('.clear');
resetButton.addEventListener('click', resetGrid);






