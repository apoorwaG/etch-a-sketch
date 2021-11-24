const gridContainer = document.querySelector(".gridContainer");
const gridLength = 500;
gridContainer.style.width = `${gridLength}px`;
gridContainer.style.length = `${gridLength}px`;

for(let i = 0; i < 256; i++){
    const box = document.createElement('div');
    box.classList.add('box');
    // box.setAttribute('style', 'width: 48.75px; height: 48.75px;');
    setBoxHandW(box, 16);
    gridContainer.appendChild(box);
}

const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('mouseover', visitBox);
});


function setBoxHandW(box, numBoxesPerSide){
    let length = gridLength / numBoxesPerSide;
    box.style.height = `${length}px`;
    box.style.width = `${length}px`;
}


function visitBox(event) {
    const box = event.target;
    console.log(box.style.backgroundColor);
    box.style.backgroundColor = 'black';
    event.stopPropagation();    // stop bubbling. default (capture: false) means stop bubbling up
                                // capture: true means stop bubbling down
}