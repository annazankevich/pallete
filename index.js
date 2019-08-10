let mode = '';

Array.from(document.getElementsByTagName('div'))
    .forEach(function (element) {
        element.addEventListener('click', function (e) {
            if (mode == 'choose-mode') {
                e.target.style.cursor = 'auto';
                setCurrentColor(e);
                mode = '';
            }
        }, true);

        element.addEventListener('mouseover', function (e) {
            if (mode == 'choose-mode') {
                e.target.style.cursor = 'crosshair';
            } else {
                e.target.style.cursor = 'auto';
            }
        }, true);
    });

let transformation = document.getElementById('transformation');
transformation.addEventListener('click', function () {
    mode = 'transform-mode';
});


let color = document.getElementById('bucket');
color.addEventListener('click', function () {
    mode = 'paint-mode';
});
let prevColor = document.getElementById('prev-color');
document.getElementById('color-choose').addEventListener('click', function (e) {
    mode = 'choose-mode';
});

let elements = document.getElementsByClassName('element');
Array.from(elements).forEach(function (element) {
    element.addEventListener('click', function (e) {
        switch (mode) {
            case 'transform-mode':
                transformElement(e);
                break;
            case 'paint-mode':
                paintElement(e);
                break;
        }
    }, true);
});

function paintElement(e) {
    let div = e.target;
    let colors = document.getElementById('current');
    let currentPick = getComputedStyle(colors).backgroundColor;
    let currenDivColor = getComputedStyle(div).backgroundColor;
    if (currenDivColor !== currentPick) {
        div.style.background = currentPick;
    }
}


function transformElement(e) {
    let div = e.target;
    if (div.getAttribute('data-shape') && div.getAttribute('data-shape') == 'circle') {
        div.setAttribute('data-shape', 'square');
        div.style.borderRadius = 0;
    } else {
        div.setAttribute('data-shape', 'circle');
        div.style.borderRadius = '50%';
    }
}

function setCurrentColor(e) {
    let element = e.target;
    let currentColors = document.getElementById('current');
    let setColor = getComputedStyle(element).backgroundColor;
    let setcurrentColors = getComputedStyle(currentColors).backgroundColor;
    if (setcurrentColors !== setColor) {
        prevColor.style.background = setcurrentColors;
        currentColors.style.background = setColor;
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'a') {
        mode = 'transform-mode';
    }
    if (e.key === 's') {
        mode = 'choose-mode';
    }
    if (e.key === 'd') {
        mode = 'paint-mode';
    }
});



